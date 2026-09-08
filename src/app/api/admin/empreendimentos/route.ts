import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseEmpreendimentoInput, gerarSlug } from "@/lib/parse-empreendimento";

export async function POST(req: Request) {
  const body = await req.json();
  const dados = parseEmpreendimentoInput(body);

  if (!dados.nome || !dados.cidade) {
    return NextResponse.json({ erro: "Preencha os campos obrigatórios" }, { status: 400 });
  }

  const slugBase = gerarSlug(dados.nome);
  let slug = slugBase;
  let contador = 1;
  while (await prisma.empreendimento.findUnique({ where: { slug } })) {
    contador += 1;
    slug = `${slugBase}-${contador}`;
  }

  const { renders, ...resto } = dados;

  const empreendimento = await prisma.empreendimento.create({
    data: { ...resto, slug, materiais: { create: renders } },
  });

  return NextResponse.json({ id: empreendimento.id });
}
