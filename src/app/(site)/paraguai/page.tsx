import Link from "next/link";
import { DevelopmentCard } from "@/components/DevelopmentCard";
import { empreendimentosParaguai } from "@/lib/sample-data";

export const metadata = {
  title: "Empreendimentos no Paraguai | Multiplic Imóveis",
};

export default function ParaguaiPage() {
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
          del Este e outras cidades do Paraguai. Valores e disponibilidade
          de unidades sob consulta.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {empreendimentosParaguai.map((emp) => (
            <DevelopmentCard key={emp.slug} empreendimento={emp} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contato"
            className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
          >
            Consultar valores e unidades disponíveis
          </Link>
        </div>
      </div>
    </section>
  );
}
