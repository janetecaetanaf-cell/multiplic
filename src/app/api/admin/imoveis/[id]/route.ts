import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseImovelInput } from "@/lib/parse-imovel";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const dados = parseImovelInput(body);

  if (!dados.titulo || !dados.endereco || !dados.cidade || !dados.estado) {
    return NextResponse.json({ erro: "Preencha os campos obrigatórios" }, { status: 400 });
  }

  const { imagens, ...resto } = dados;

  await prisma.$transaction([
    prisma.imagemImovel.deleteMany({ where: { imovelId: id } }),
    prisma.imovel.update({
      where: { id },
      data: {
        ...resto,
        imagens: { create: imagens },
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.imovel.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
