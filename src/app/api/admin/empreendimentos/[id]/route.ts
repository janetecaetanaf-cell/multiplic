import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseEmpreendimentoInput } from "@/lib/parse-empreendimento";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const dados = parseEmpreendimentoInput(body);

  if (!dados.nome || !dados.cidade) {
    return NextResponse.json({ erro: "Preencha os campos obrigatórios" }, { status: 400 });
  }

  const { renders, ...resto } = dados;

  await prisma.$transaction([
    prisma.materialEmpreendimento.deleteMany({ where: { empreendimentoId: id, tipo: "RENDER" } }),
    prisma.empreendimento.update({
      where: { id },
      data: { ...resto, materiais: { create: renders } },
    }),
  ]);

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.empreendimento.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
