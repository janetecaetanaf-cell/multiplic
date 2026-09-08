import Link from "next/link";
import { notFound } from "next/navigation";
import { getImovelPorId } from "@/lib/imoveis-data";
import { formatarPreco } from "@/lib/format";
import { GaleriaEmpreendimento } from "@/components/GaleriaEmpreendimento";

export const revalidate = 0;

export default async function ImovelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const imovel = await getImovelPorId(id);

  if (!imovel) notFound();

  const area = imovel.areaUtil ?? imovel.areaTotal;

  return (
    <div>
      <section className="bg-brand-gray">
        <GaleriaEmpreendimento
          imagens={imovel.imagens.map((img) => img.url)}
          nome={imovel.titulo}
        />
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <p className="text-sm">
          <Link href="/imoveis" className="text-brand-red hover:text-brand-red-dark">
            ← Imóveis no Brasil
          </Link>
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red">
            {imovel.tipo}
          </span>
          <span className="text-sm text-brand-gray/60">
            {imovel.endereco} · {imovel.cidade}/{imovel.estado}
          </span>
        </div>

        <h1 className="mt-2 font-heading text-3xl font-bold text-brand-gray sm:text-4xl">
          {imovel.titulo}
        </h1>

        <p className="mt-3 text-xl font-semibold text-brand-gray">
          {formatarPreco(Number(imovel.preco))}
        </p>

        <dl className="mt-6 flex flex-wrap gap-6 border-y border-black/5 py-5 text-sm text-brand-gray/70">
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-gray/50">Quartos</dt>
            <dd className="mt-1 font-semibold text-brand-gray">{imovel.quartos}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-gray/50">Suítes</dt>
            <dd className="mt-1 font-semibold text-brand-gray">{imovel.suites}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-gray/50">Banheiros</dt>
            <dd className="mt-1 font-semibold text-brand-gray">{imovel.banheiros}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-gray/50">Vagas</dt>
            <dd className="mt-1 font-semibold text-brand-gray">{imovel.vagas}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-brand-gray/50">Área</dt>
            <dd className="mt-1 font-semibold text-brand-gray">{String(area)} m²</dd>
          </div>
        </dl>

        {imovel.descricao && (
          <p className="mt-6 max-w-2xl whitespace-pre-line text-brand-gray/70">
            {imovel.descricao}
          </p>
        )}

        {imovel.caracteristicas.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-semibold text-brand-gray">
              Características
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {imovel.caracteristicas.map((ic) => (
                <li
                  key={ic.id}
                  className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-brand-gray/70"
                >
                  {ic.caracteristica.nome}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 border-t border-black/5 pt-8">
          <Link
            href="/contato"
            className="rounded-full border border-brand-red px-6 py-3 text-sm font-semibold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
          >
            Falar com um corretor
          </Link>
        </div>
      </div>
    </div>
  );
}
