import Link from "next/link";

export const metadata = {
  title: "Sobre | Multiplic Imóveis",
};

export default function SobrePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
        Sobre
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-gray">
        A Multiplic Imóveis
      </h1>
      <p className="mt-4 text-brand-gray/70">
        A Multiplic Imóveis atua com venda de imóveis em Brasília e região,
        e é parceira comercial da Vierci Development para representar
        empreendimentos imobiliários no Paraguai.
      </p>
      <div className="mt-8">
        <Link
          href="/contato"
          className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          Fale com a gente
        </Link>
      </div>
    </section>
  );
}
