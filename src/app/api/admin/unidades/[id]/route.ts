import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseUnidadeInput } from "@/lib/parse-unidade";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const dados = parseUnidadeInput(body);

  if (!dados.codigo || !dados.tipo) {
    return NextResponse.json({ erro: "Preencha os campos obrigatórios" }, { status: 400 });
  }

  const { empreendimentoId: _empreendimentoId, ...resto } = dados;

  try {
    await prisma.unidade.update({ where: { id }, data: resto });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { erro: "Já existe uma unidade com esse código neste empreendimento" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.unidade.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
