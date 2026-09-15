import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { put } from "@vercel/blob";
import path from "path";
import { randomUUID } from "crypto";

// Em producao (Vercel), o disco e somente leitura - usa o Vercel Blob
// (BLOB_READ_WRITE_TOKEN injetado automaticamente quando o storage esta
// conectado ao projeto). Em desenvolvimento local, sem essa variavel,
// continua gravando em /public/uploads como antes.
const EXTENSOES_PERMITIDAS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const TAMANHO_MAX = 8 * 1024 * 1024; // 8MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const pasta = formData.get("pasta")?.toString() || "geral";

    if (!(file instanceof File)) {
      return NextResponse.json({ erro: "Arquivo não enviado" }, { status: 400 });
    }

    if (file.size > TAMANHO_MAX) {
      return NextResponse.json({ erro: "Arquivo maior que 8MB" }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!EXTENSOES_PERMITIDAS.has(ext)) {
      return NextResponse.json({ erro: "Formato de imagem não suportado" }, { status: 400 });
    }

    const pastaSegura = pasta.replace(/[^a-z0-9-_]/gi, "");
    const nomeArquivo = `${randomUUID()}${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`${pastaSegura}/${nomeArquivo}`, bytes, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    }

    const dirDestino = path.join(process.cwd(), "public", "uploads", pastaSegura);
    await mkdir(dirDestino, { recursive: true });
    await writeFile(path.join(dirDestino, nomeArquivo), bytes);

    return NextResponse.json({ url: `/uploads/${pastaSegura}/${nomeArquivo}` });
  } catch (err) {
    console.error("Erro no upload:", err);
    return NextResponse.json({ erro: "Falha ao enviar a imagem" }, { status: 500 });
  }
}
