import { readFile } from "fs/promises";
import { PrismaClient } from "@prisma/client";
import { importarUnidadesDeArquivo } from "../src/lib/xlsx-unidades.ts";
import { gerarSlug } from "../src/lib/parse-empreendimento.ts";

const prisma = new PrismaClient();

const EMPREENDIMENTOS = [
  { nome: "V Tower Boggiani", cidade: "Asunción", status: "EM_CONSTRUCAO", arquivo: "V Tower Boggiani.xlsx" },
  { nome: "V Tower Riviera", cidade: "Encarnación", status: "EM_CONSTRUCAO", arquivo: "V Tower Riviera.xlsx" },
  { nome: "V Tower Del Lago", cidade: "Ciudad del Este", status: "EM_CONSTRUCAO", arquivo: "LISTA DE PRECIOS V TOWER DEL LAGO.xlsx" },
  { nome: "V Tower Recoleta", cidade: "Asunción", status: "EM_CONSTRUCAO", arquivo: "Disponibilidad V-Tower Recoleta.xlsx" },
  { nome: "V Tower Mariscal", cidade: "Asunción", status: "PROJETO_NA_PLANTA", arquivo: "V TOWER MARISCAL.xlsx" },
  { nome: "V Tower Fernando", cidade: "Fernando de la Mora", status: "EM_CONSTRUCAO", arquivo: "Disponibilidad Fernando.xlsx" },
] as const;

for (const item of EMPREENDIMENTOS) {
  let empreendimento = await prisma.empreendimento.findFirst({ where: { nome: item.nome } });

  if (!empreendimento) {
    empreendimento = await prisma.empreendimento.create({
      data: {
        nome: item.nome,
        cidade: item.cidade,
        status: item.status,
        slug: gerarSlug(item.nome),
      },
    });
    console.log("criado empreendimento:", item.nome);
  } else {
    console.log("empreendimento ja existia:", item.nome);
  }

  const buffer = await readFile(`C:\\Users\\Janete\\Downloads\\${item.arquivo}`);
  const { unidades, avisos } = await importarUnidadesDeArquivo(buffer);

  let criadas = 0;
  let atualizadas = 0;
  for (const u of unidades) {
    const existente = await prisma.unidade.findUnique({
      where: { empreendimentoId_codigo: { empreendimentoId: empreendimento.id, codigo: u.codigo } },
    });
    if (existente) {
      await prisma.unidade.update({
        where: { id: existente.id },
        data: { andar: u.andar, tipo: u.tipo, areaTotal: u.areaTotal, preco: u.preco, status: u.status },
      });
      atualizadas++;
    } else {
      await prisma.unidade.create({
        data: { empreendimentoId: empreendimento.id, codigo: u.codigo, andar: u.andar, tipo: u.tipo, areaTotal: u.areaTotal, preco: u.preco, status: u.status },
      });
      criadas++;
    }
  }

  console.log(`  -> ${unidades.length} unidades (${criadas} criadas, ${atualizadas} atualizadas), avisos: ${avisos.length}`);
}

await prisma.$disconnect();
