import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseUnidadeInput } from "@/lib/parse-unidade";

export async function POST(req: Request) {
  const body = await req.json();
  const dados = parseUnidadeInput(body);

  if (!dados.empreendimentoId || !dados.codigo || !dados.tipo) {
    return NextResponse.json({ erro: "Preencha os campos obrigatórios" }, { status: 400 });
  }

  try {
    const unidade = await prisma.unidade.create({ data: dados });
    return NextResponse.json({ id: unidade.id });
  } catch {
    return NextResponse.json(
      { erro: "Já existe uma unidade com esse código neste empreendimento" },
      { status: 400 }
    );
  }
}
