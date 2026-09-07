import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Contato | Multiplic Imóveis",
};

export default function ContatoPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">
        Contato
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-gray">
        Fale com a Multiplic Imóveis
      </h1>
      <p className="mt-3 text-brand-gray/70">
        Preencha o formulário abaixo ou fale direto pelo WhatsApp. Um
        corretor entra em contato o quanto antes.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>

      <div className="mt-10 border-t border-black/5 pt-6 text-sm text-brand-gray/70">
        <p>{siteConfig.cidadeBase}</p>
        <p>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-red">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
