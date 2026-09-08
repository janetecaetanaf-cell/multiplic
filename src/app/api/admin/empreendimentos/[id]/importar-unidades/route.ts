import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { importarUnidadesDeArquivo } from "@/lib/xlsx-unidades";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const empreendimento = await prisma.empreendimento.findUnique({ where: { id } });
  if (!empreendimento) {
    return NextResponse.json({ erro: "Empreendimento não encontrado" }, { status: 404 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ erro: "Arquivo não enviado" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let resultado;
  try {
    resultado = await importarUnidadesDeArquivo(buffer);
  } catch {
    return NextResponse.json(
      { erro: "Não consegui ler esse arquivo. Confirme que é uma planilha .xlsx válida." },
      { status: 400 }
    );
  }

  let criadas = 0;
  let atualizadas = 0;

  for (const u of resultado.unidades) {
    const existente = await prisma.unidade.findUnique({
      where: { empreendimentoId_codigo: { empreendimentoId: id, codigo: u.codigo } },
    });

    if (existente) {
      await prisma.unidade.update({
        where: { id: existente.id },
        data: {
          andar: u.andar,
          tipo: u.tipo,
          areaTotal: u.areaTotal,
          preco: u.preco,
          status: u.status,
        },
      });
      atualizadas += 1;
    } else {
      await prisma.unidade.create({
        data: {
          empreendimentoId: id,
          codigo: u.codigo,
          andar: u.andar,
          tipo: u.tipo,
          areaTotal: u.areaTotal,
          preco: u.preco,
          status: u.status,
        },
      });
      criadas += 1;
    }
  }

  return NextResponse.json({
    totalNaPlanilha: resultado.unidades.length,
    criadas,
    atualizadas,
    avisos: resultado.avisos,
  });
}
