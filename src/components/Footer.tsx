import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { PARAGUAI_ATIVO } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-brand-gray text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <Image
              src="/brand/logo-square-white.png"
              alt="Multiplic Imóveis"
              width={64}
              height={64}
              className="h-14 w-14"
            />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              {PARAGUAI_ATIVO
                ? "Imóveis à venda no Brasil e empreendimentos no Paraguai, com atendimento próximo do início ao fim."
                : "Imóveis à venda em Brasília e região, com atendimento próximo do início ao fim."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/imoveis" className="text-white/80 hover:text-white">Imóveis no Brasil</Link></li>
              {PARAGUAI_ATIVO && (
                <li><Link href="/paraguai" className="text-white/80 hover:text-white">Empreendimentos no Paraguai</Link></li>
              )}
              <li><Link href="/sobre" className="text-white/80 hover:text-white">Sobre a Multiplic</Link></li>
              <li><Link href="/contato" className="text-white/80 hover:text-white">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Contato
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>{siteConfig.cidadeBase}</li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.telefoneWhatsapp}`}
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Multiplic Imóveis. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
