import { prisma } from "@/lib/prisma";

const INCLUDE_PADRAO = {
  imagens: { orderBy: { ordem: "asc" as const } },
};

export async function getImoveisPublicados() {
  return prisma.imovel.findMany({
    where: { disponivel: true },
    orderBy: [{ destaque: "desc" }, { createdAt: "desc" }],
    include: INCLUDE_PADRAO,
  });
}

export async function getImovelPorId(id: string) {
  return prisma.imovel.findFirst({
    where: { id, disponivel: true },
    include: {
      ...INCLUDE_PADRAO,
      caracteristicas: { include: { caracteristica: true } },
    },
  });
}

export type ImovelComRelacoes = NonNullable<Awaited<ReturnType<typeof getImovelPorId>>>;
