import Link from "next/link";
import { notFound } from "next/navigation";
import { getEmpreendimentoPorSlug, precoAPartir } from "@/lib/paraguai-data";
import { formatarPreco } from "@/lib/format";
import { UnidadesDisponiveis } from "@/components/UnidadesDisponiveis";
import { GaleriaEmpreendimento } from "@/components/GaleriaEmpreendimento";

export const revalidate = 0;

const STATUS_LABEL: Record<string, string> = {
  PROJETO_NA_PLANTA: "Projeto na planta",
  EM_CONSTRUCAO: "Em construção",
  ENTREGUE: "Entregue",
};

export default async function EmpreendimentoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const empreendimento = await getEmpreendimentoPorSlug(slug);

  if (!empreendimento) notFound();

  const renders = empreendimento.materiais;
  const desdePreco = precoAPartir(empreendimento);

  return (
    <div>
      {/* Galeria */}
      <section className="bg-brand-gray">
        <GaleriaEmpreendimento
          imagens={renders.map((r) => r.url)}
          nome={empreendimento.nome}
        />
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <p className="text-sm">
          <Link href="/paraguai" className="text-brand-red hover:text-brand-red-dark">
            ← Empreendimentos no Paraguai
          </Link>
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red">
            {STATUS_LABEL[empreendimento.status] ?? empreendimento.status}
          </span>
          <span className="text-sm text-brand-gray/60">{empreendimento.cidade}, Paraguai</span>
        </div>

        <h1 className="mt-2 font-heading text-3xl font-bold text-brand-gray sm:text-4xl">
          {empreendimento.nome}
        </h1>

        {desdePreco && (
          <p className="mt-3 text-xl font-semibold text-brand-gray">
            Unidades a partir de {formatarPreco(desdePreco, "USD")}
          </p>
        )}

        {empreendimento.descricaoPt && (
          <p className="mt-6 max-w-2xl whitespace-pre-line text-brand-gray/70">
            {empreendimento.descricaoPt}
          </p>
        )}

        <div className="mt-10">
          <UnidadesDisponiveis
            unidades={empreendimento.unidades.map((u) => ({
              id: u.id,
              codigo: u.codigo,
              andar: u.andar,
              tipo: u.tipo,
              areaTotal: String(u.areaTotal),
              preco: String(u.preco),
            }))}
          />
        </div>

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
