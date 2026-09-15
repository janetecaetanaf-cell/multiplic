import Image from "next/image";
import { AnabbForm } from "@/components/AnabbForm";
import { linkWhatsapp } from "@/lib/site-config";

export const metadata = {
  title: "Convênio ANABB | Multiplic Imóveis",
};

const BENEFICIOS = [
  {
    titulo: "Credibilidade e segurança",
    texto: "Negociação acompanhada por uma imobiliária credenciada, do início ao fim.",
  },
  {
    titulo: "Condições especiais",
    texto: "Benefícios exclusivos para associados ANABB e funcionários do Banco do Brasil.",
  },
  {
    titulo: "Atendimento próximo",
    texto: "Um corretor confirma seu cadastro e te acompanha pessoalmente na negociação.",
  },
];

export default function ConvenioAnabbPage() {
  return (
    <div>
      <section className="bg-brand-gray py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="inline-flex items-center gap-4 rounded-2xl bg-white px-6 py-3 shadow-sm">
            <Image
              src="/brand/logo-horizontal-color.png"
              alt="Multiplic Imóveis"
              width={140}
              height={44}
              className="h-8 w-auto"
            />
            <span className="h-8 w-px bg-black/10" />
            <Image
              src="/brand/anabb-logo.webp"
              alt="ANABB"
              width={175}
              height={38}
              className="h-7 w-auto"
            />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-red">
            Multiplic Imóveis | Credenciada ANABB
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Multiplic Imóveis + ANABB: segurança para negociar, vantagens
            para você.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Condições especiais para associados ANABB e funcionários do
            Banco do Brasil.
          </p>
          <a
            href={linkWhatsapp(
              "Olá! Sou associado(a) ANABB e gostaria de saber mais sobre as condições especiais da Multiplic Imóveis."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:brightness-95"
          >
            Falar agora pelo WhatsApp
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {BENEFICIOS.map((item) => (
            <div key={item.titulo}>
              <h3 className="font-heading text-lg font-semibold text-brand-gray">
                {item.titulo}
              </h3>
              <p className="mt-2 text-brand-gray/70">{item.texto}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-brand-gray">
            Solicitar condições ANABB
          </h2>
          <p className="mt-2 text-sm text-brand-gray/70">
            Preencha seus dados e a matrícula ANABB (ou CPF). Um corretor
            confirma seu cadastro e te retorna com as condições especiais.
          </p>
          <div className="mt-6">
            <AnabbForm />
          </div>
        </div>
      </section>
    </div>
  );
}
