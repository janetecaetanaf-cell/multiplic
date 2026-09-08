import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { UnidadesManager } from "@/components/admin/UnidadesManager";

export const metadata = { title: "Unidades | Admin Multiplic" };

export default async function UnidadesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const empreendimento = await prisma.empreendimento.findUnique({
    where: { id },
    include: { unidades: { orderBy: { codigo: "asc" } } },
  });

  if (!empreendimento) notFound();

  return (
    <div>
      <p className="text-sm">
        <Link href="/admin/empreendimentos" className="text-brand-red hover:text-brand-red-dark">
          ← Empreendimentos
        </Link>
      </p>
      <h1 className="mt-2 font-heading text-2xl font-bold text-brand-gray">
        Unidades — {empreendimento.nome}
      </h1>

      <div className="mt-6">
        <UnidadesManager
          empreendimentoId={empreendimento.id}
          unidadesIniciais={empreendimento.unidades.map((u) => ({
            id: u.id,
            codigo: u.codigo,
            andar: u.andar,
            tipo: u.tipo,
            areaTotal: String(u.areaTotal),
            preco: String(u.preco),
            status: u.status,
          }))}
        />
      </div>
    </div>
  );
}
