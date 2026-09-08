// Copia todos os dados do banco local (.env DATABASE_URL) para o banco
// na nuvem indicado em CLOUD_DATABASE_URL. Rodar uma unica vez, na
// preparacao do primeiro deploy.
import { PrismaClient } from "@prisma/client";

const cloudUrl = process.env.CLOUD_DATABASE_URL;
if (!cloudUrl) {
  console.error("Defina CLOUD_DATABASE_URL antes de rodar este script.");
  process.exit(1);
}

const local = new PrismaClient();
const cloud = new PrismaClient({ datasources: { db: { url: cloudUrl } } });

async function copiar<T>(nome: string, dados: T[], inserir: (linhas: T[]) => Promise<unknown>) {
  if (dados.length === 0) {
    console.log(`${nome}: nada para copiar`);
    return;
  }
  await inserir(dados);
  console.log(`${nome}: ${dados.length} registro(s) copiado(s)`);
}

async function main() {
  const usuarios = await local.usuario.findMany();
  await copiar("Usuario", usuarios, (d) => cloud.usuario.createMany({ data: d, skipDuplicates: true }));

  const caracteristicas = await local.caracteristica.findMany();
  await copiar("Caracteristica", caracteristicas, (d) =>
    cloud.caracteristica.createMany({ data: d, skipDuplicates: true })
  );

  const empreendimentos = await local.empreendimento.findMany();
  await copiar("Empreendimento", empreendimentos, (d) =>
    cloud.empreendimento.createMany({ data: d, skipDuplicates: true })
  );

  const imoveis = await local.imovel.findMany();
  await copiar("Imovel", imoveis, (d) => cloud.imovel.createMany({ data: d, skipDuplicates: true }));

  const imagensImovel = await local.imagemImovel.findMany();
  await copiar("ImagemImovel", imagensImovel, (d) =>
    cloud.imagemImovel.createMany({ data: d, skipDuplicates: true })
  );

  const imovelCaracteristicas = await local.imovelCaracteristica.findMany();
  await copiar("ImovelCaracteristica", imovelCaracteristicas, (d) =>
    cloud.imovelCaracteristica.createMany({ data: d, skipDuplicates: true })
  );

  const unidades = await local.unidade.findMany();
  await copiar("Unidade", unidades, (d) => cloud.unidade.createMany({ data: d, skipDuplicates: true }));

  const materiais = await local.materialEmpreendimento.findMany();
  await copiar("MaterialEmpreendimento", materiais, (d) =>
    cloud.materialEmpreendimento.createMany({ data: d, skipDuplicates: true })
  );

  const leads = await local.lead.findMany();
  await copiar("Lead", leads, (d) => cloud.lead.createMany({ data: d, skipDuplicates: true }));

  console.log("\nMigracao concluida.");
}

main()
  .catch((err) => {
    console.error("ERRO na migracao:", err);
    process.exit(1);
  })
  .finally(async () => {
    await local.$disconnect();
    await cloud.$disconnect();
  });
