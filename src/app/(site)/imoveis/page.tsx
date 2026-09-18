import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { getImoveisPublicados } from "@/lib/imoveis-data";

export const revalidate = 0;

export const metadata = {
  title: "Imóveis | Multiplic Imóveis",
};

const FILTROS_FINALIDADE = [
  { valor: undefined, label: "Todos" },
  { valor: "VENDA", label: "Comprar" },
  { valor: "ALUGUEL", label: "Alugar" },
] as const;

const FILTROS_TIPO = [
  { valor: undefined, label: "Todos os tipos" },
  { valor: "Apartamento", label: "Apartamento" },
  { valor: "Casa", label: "Casa" },
  { valor: "Terreno", label: "Terreno" },
  { valor: "Comercial", label: "Comercial" },
  { valor: "Prédio/Edifício", label: "Prédio/Edifício" },
] as const;

function linkComFiltros(finalidade?: string, tipo?: string) {
  const params = new URLSearchParams();
  if (finalidade) params.set("finalidade", finalidade);
  if (tipo) params.set("tipo", tipo);
  const query = params.toString();
  return query ? `/imoveis?${query}` : "/imoveis";
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<{ finalidade?: string; tipo?: string }>;
}) {
  const { finalidade, tipo } = await searchParams;
  const finalidadeAtiva = finalidade === "VENDA" || finalidade === "ALUGUEL" ? finalidade : undefined;
  const tipoAtivo = FILTROS_TIPO.some((f) => f.valor === tipo) ? tipo : undefined;
  const imoveis = await getImoveisPublicados({ finalidade: finalidadeAtiva, tipo: tipoAtivo });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
        Brasília e Região
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-gray">
        Imóveis
      </h1>
      <p className="mt-3 max-w-2xl text-brand-gray/70">
        Em breve: busca por cidade e faixa de preço. Por enquanto, fale
        com a gente para ver a lista completa.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTROS_FINALIDADE.map((f) => (
          <Link
            key={f.label}
            href={linkComFiltros(f.valor, tipoAtivo)}
            className={
              finalidadeAtiva === f.valor
                ? "rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-brand-gray hover:border-brand-red hover:text-brand-red"
            }
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {FILTROS_TIPO.map((f) => (
          <Link
            key={f.label}
            href={linkComFiltros(finalidadeAtiva, f.valor)}
            className={
              tipoAtivo === f.valor
                ? "rounded-full bg-brand-gray px-4 py-2 text-xs font-semibold text-white"
                : "rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-brand-gray/70 hover:border-brand-gray hover:text-brand-gray"
            }
          >
            {f.label}
          </Link>
        ))}
      </div>

      {imoveis.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imoveis.map((imovel) => (
            <PropertyCard
              key={imovel.id}
              imovel={{
                id: imovel.id,
                titulo: imovel.titulo,
                cidade: imovel.cidade,
                estado: imovel.estado,
                endereco: imovel.endereco,
                preco: Number(imovel.preco),
                finalidade: imovel.finalidade,
                tipo: imovel.tipo,
                quartos: imovel.quartos,
                banheiros: imovel.banheiros,
                areaUtil: imovel.areaUtil ? Number(imovel.areaUtil) : null,
                areaTotal: Number(imovel.areaTotal),
                capaUrl: imovel.imagens[0]?.url,
              }}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-brand-gray/60">
          Nenhum imóvel encontrado com esse filtro.
        </p>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/contato"
          className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          Ver mais imóveis com um corretor
        </Link>
      </div>
    </section>
  );
}
