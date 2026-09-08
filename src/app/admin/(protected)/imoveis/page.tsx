import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatarPreco } from "@/lib/format";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Imóveis | Admin Multiplic" };

export default async function AdminImoveisPage() {
  const imoveis = await prisma.imovel.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-brand-gray">Imóveis (Brasil)</h1>
        <Link
          href="/admin/imoveis/novo"
          className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark"
        >
          + Novo imóvel
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-brand-gray/60">
            <tr>
              <th className="px-5 py-3">Título</th>
              <th className="px-5 py-3">Cidade</th>
              <th className="px-5 py-3">Preço</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {imoveis.map((imovel) => (
              <tr key={imovel.id}>
                <td className="px-5 py-3 font-medium text-brand-gray">{imovel.titulo}</td>
                <td className="px-5 py-3 text-brand-gray/70">{imovel.cidade}</td>
                <td className="px-5 py-3 text-brand-gray/70">
                  {formatarPreco(Number(imovel.preco))}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      imovel.disponivel
                        ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
                        : "rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500"
                    }
                  >
                    {imovel.disponivel ? "Disponível" : "Indisponível"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-4">
                    <Link
                      href={`/admin/imoveis/${imovel.id}`}
                      className="text-sm font-medium text-brand-red hover:text-brand-red-dark"
                    >
                      Editar
                    </Link>
                    <DeleteButton
                      url={`/api/admin/imoveis/${imovel.id}`}
                      confirmMsg={`Excluir o imóvel "${imovel.titulo}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {imoveis.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-brand-gray/50">
                  Nenhum imóvel cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
