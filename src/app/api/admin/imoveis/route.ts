import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseImovelInput } from "@/lib/parse-imovel";

export async function POST(req: Request) {
  const body = await req.json();
  const dados = parseImovelInput(body);

  if (!dados.titulo || !dados.endereco || !dados.cidade || !dados.estado) {
    return NextResponse.json({ erro: "Preencha os campos obrigatórios" }, { status: 400 });
  }

  const { imagens, ...resto } = dados;

  const imovel = await prisma.imovel.create({
    data: {
      ...resto,
      imagens: { create: imagens },
    },
  });

  return NextResponse.json({ id: imovel.id });
}
