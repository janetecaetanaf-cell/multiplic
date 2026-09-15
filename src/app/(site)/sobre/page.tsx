import Link from "next/link";
import { PARAGUAI_ATIVO } from "@/lib/config";

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
      <div className="mt-4 space-y-4 text-brand-gray/70">
        <p>
          A Multiplic Imóveis atua no mercado imobiliário de Brasília e
          região há mais de 25 anos, com atendimento personalizado
          durante todo o processo de compra e venda
          {PARAGUAI_ATIVO
            ? " e é parceira comercial da Vierci Development para representar empreendimentos imobiliários no Paraguai"
            : ""}
          . Nossa corretora responsável é avaliadora e perita judicial,
          o que garante segurança e critério em cada avaliação e
          negociação.
        </p>
        <p>
          Todas as visitas aos imóveis são agendadas e o cliente sempre
          é acompanhado por um corretor. Do primeiro contato até a
          assinatura do contrato, Multiplic — sinônimo de bons negócios!
        </p>
      </div>
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
