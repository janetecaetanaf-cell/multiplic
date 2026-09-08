import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Empreendimentos | Admin Multiplic" };

const STATUS_LABEL: Record<string, string> = {
  PROJETO_NA_PLANTA: "Projeto na planta",
  EM_CONSTRUCAO: "Em construção",
  ENTREGUE: "Entregue",
};

export default async function AdminEmpreendimentosPage() {
  const empreendimentos = await prisma.empreendimento.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { unidades: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-brand-gray">
          Empreendimentos (Paraguai)
        </h1>
        <Link
          href="/admin/empreendimentos/novo"
          className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark"
        >
          + Novo empreendimento
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white">
        <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-brand-gray/60">
            <tr>
              <th className="px-5 py-3">Nome</th>
              <th className="px-5 py-3">Cidade</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Unidades</th>
              <th className="px-5 py-3">Publicado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {empreendimentos.map((emp) => (
              <tr key={emp.id}>
                <td className="px-5 py-3 font-medium text-brand-gray">{emp.nome}</td>
                <td className="px-5 py-3 text-brand-gray/70">{emp.cidade}</td>
                <td className="px-5 py-3 text-brand-gray/70">{STATUS_LABEL[emp.status]}</td>
                <td className="px-5 py-3 text-brand-gray/70">
                  <Link
                    href={`/admin/empreendimentos/${emp.id}/unidades`}
                    className="text-brand-red hover:text-brand-red-dark"
                  >
                    {emp._count.unidades} unidade(s)
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      emp.publicado
                        ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
                        : "rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500"
                    }
                  >
                    {emp.publicado ? "Sim" : "Não"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/empreendimentos/${emp.id}`}
                      className="text-sm font-medium text-brand-red hover:text-brand-red-dark"
                    >
                      Editar
                    </Link>
                    <DeleteButton
                      url={`/api/admin/empreendimentos/${emp.id}`}
                      confirmMsg={`Excluir o empreendimento "${emp.nome}"? Isso remove também as unidades cadastradas.`}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {empreendimentos.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-brand-gray/50">
                  Nenhum empreendimento cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
