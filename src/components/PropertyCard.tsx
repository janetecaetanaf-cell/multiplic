import { ImovelDestaque, formatarPreco } from "@/lib/sample-data";

export function PropertyCard({ imovel }: { imovel: ImovelDestaque }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-brand-gray/25" fill="currentColor">
          <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z" />
        </svg>
        <span className="absolute left-4 top-4 rounded-full bg-brand-red px-3 py-1 text-xs font-semibold text-white">
          {imovel.tipo}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-red">
          {imovel.bairro} · {imovel.cidade}
        </p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-brand-gray">
          {imovel.titulo}
        </h3>

        <p className="mt-3 text-xl font-bold text-brand-gray">
          {formatarPreco(imovel.preco)}
        </p>

        <dl className="mt-4 flex gap-4 border-t border-black/5 pt-4 text-sm text-brand-gray/70">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Quartos</dt>
            <dd>{imovel.quartos} quartos</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Banheiros</dt>
            <dd>{imovel.banheiros} banheiros</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Área útil</dt>
            <dd>{imovel.areaUtil} m²</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
