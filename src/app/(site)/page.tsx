import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { DevelopmentCard } from "@/components/DevelopmentCard";
import { imoveisDestaque } from "@/lib/sample-data";
import { getEmpreendimentosPublicados, precoAPartir } from "@/lib/paraguai-data";

const DIFERENCIAIS = [
  {
    titulo: "Atendimento próximo",
    texto: "Acompanhamento direto com um corretor, do primeiro contato até a assinatura.",
  },
  {
    titulo: "Parceria internacional",
    texto: "Representação exclusiva de empreendimentos da Vierci Development no Paraguai.",
  },
  {
    titulo: "Curadoria de imóveis",
    texto: "Cada imóvel anunciado é verificado e documentado antes de ir ao ar.",
  },
];

export default async function Home() {
  const empreendimentos = (await getEmpreendimentosPublicados()).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-brand-gray bg-[length:900px] bg-[position:right_-120px_top_-120px] bg-no-repeat"
        style={{ backgroundImage: "url(/brand/symbol.png)", backgroundBlendMode: "soft-light" }}
      >
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
            Multiplic Imóveis
          </p>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Imóveis no Brasil e no Paraguai, tudo em um só lugar
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Encontre o imóvel ideal em Brasília e região, ou invista em
            lançamentos imobiliários no Paraguai com o respaldo de uma
            parceria internacional.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/imoveis"
              className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
            >
              Ver em Brasília e Região
            </Link>
            <Link
              href="/paraguai"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver no Paraguai
            </Link>
          </div>
        </div>
      </section>

      {/* Imoveis em destaque */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
              Brasil
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-brand-gray">
              Imóveis em destaque
            </h2>
          </div>
          <Link
            href="/imoveis"
            className="text-sm font-semibold text-brand-red hover:text-brand-red-dark"
          >
            Ver todos os imóveis →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imoveisDestaque.map((imovel) => (
            <PropertyCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </section>

      {/* Empreendimentos Paraguai */}
      <section className="bg-brand-gray py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
                Paraguai
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-white">
                Empreendimentos em parceria com a Vierci Development
              </h2>
              <p className="mt-3 max-w-2xl text-white/60">
                Lançamentos e obras em andamento em Assunção, Encarnación,
                Ciudad del Este e outras cidades do Paraguai.
              </p>
            </div>
            <Link
              href="/paraguai"
              className="text-sm font-semibold text-white hover:text-white/70"
            >
              Ver todos os empreendimentos →
            </Link>
          </div>

          {empreendimentos.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {empreendimentos.map((emp) => (
                <DevelopmentCard
                  key={emp.slug}
                  empreendimento={{
                    slug: emp.slug,
                    nome: emp.nome,
                    cidade: emp.cidade,
                    status: emp.status,
                    capaUrl: emp.materiais[0]?.url,
                    precoAPartir: precoAPartir(emp),
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-white/60">
              Em breve, novos empreendimentos publicados aqui.
            </p>
          )}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-brand-gray">
          Por que a Multiplic
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {DIFERENCIAIS.map((item) => (
            <div key={item.titulo}>
              <h3 className="font-heading text-lg font-semibold text-brand-gray">
                {item.titulo}
              </h3>
              <p className="mt-2 text-brand-gray/70">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA contato */}
      <section className="border-t border-black/5 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-gray">
            Procurando um imóvel específico?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-gray/70">
            Fale com a gente e um corretor vai te ajudar a encontrar a
            melhor opção, no Brasil ou no Paraguai.
          </p>
          <Link
            href="/contato"
            className="mt-8 inline-block rounded-full bg-brand-red px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
          >
            Fale conosco
          </Link>
        </div>
      </section>
    </>
  );
}
