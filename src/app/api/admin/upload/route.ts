import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

// Armazenamento local em /public/uploads - serve bem para desenvolvimento.
// Antes de publicar o site de verdade, trocar por um storage externo
// (Cloudinary, S3, etc.), pois arquivos locais nao sobrevivem a um deploy
// serverless (Vercel) nem escalam entre instancias.
const EXTENSOES_PERMITIDAS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const TAMANHO_MAX = 8 * 1024 * 1024; // 8MB

export async function POST(req: Request) {
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
  const dirDestino = path.join(process.cwd(), "public", "uploads", pastaSegura);
  await mkdir(dirDestino, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dirDestino, nomeArquivo), bytes);

  return NextResponse.json({ url: `/uploads/${pastaSegura}/${nomeArquivo}` });
}
