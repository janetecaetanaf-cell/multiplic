import Link from "next/link";
import { DevelopmentCard } from "@/components/DevelopmentCard";
import { getEmpreendimentosPublicados, precoAPartir } from "@/lib/paraguai-data";

export const revalidate = 0;

export const metadata = {
  title: "Empreendimentos no Paraguai | Multiplic Imóveis",
};

export default async function ParaguaiPage() {
  const empreendimentos = await getEmpreendimentosPublicados();

  return (
    <section className="bg-brand-gray py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
          Paraguai
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-white">
          Empreendimentos em parceria com a Vierci Development
        </h1>
        <p className="mt-3 max-w-2xl text-white/60">
          Lançamentos e obras em andamento em Assunção, Encarnación, Ciudad
          del Este e outras cidades do Paraguai.
        </p>

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

        <div className="mt-12 text-center">
          <Link
            href="/contato"
            className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
          >
            Falar com um corretor
          </Link>
        </div>
      </div>
    </section>
  );
}
