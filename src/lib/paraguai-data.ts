import { prisma } from "@/lib/prisma";

const INCLUDE_PADRAO = {
  materiais: { where: { tipo: "RENDER" as const }, orderBy: { ordem: "asc" as const } },
  unidades: { where: { status: "DISPONIVEL" as const }, orderBy: { preco: "asc" as const } },
};

export async function getEmpreendimentosPublicados() {
  return prisma.empreendimento.findMany({
    where: { publicado: true },
    orderBy: [{ destaque: "desc" }, { createdAt: "desc" }],
    include: INCLUDE_PADRAO,
  });
}

export async function getEmpreendimentoPorSlug(slug: string) {
  return prisma.empreendimento.findFirst({
    where: { slug, publicado: true },
    include: INCLUDE_PADRAO,
  });
}

export type EmpreendimentoComRelacoes = NonNullable<
  Awaited<ReturnType<typeof getEmpreendimentoPorSlug>>
>;

export function precoAPartir(empreendimento: { unidades: { preco: unknown }[] }) {
  if (empreendimento.unidades.length === 0) return null;
  return Number(empreendimento.unidades[0].preco);
}
