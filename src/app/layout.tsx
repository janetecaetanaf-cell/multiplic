import type { Metadata } from "next";
import { Montserrat, Faustina } from "next/font/google";
import { PARAGUAI_ATIVO } from "@/lib/config";
import "./globals.css";

// Fonte oficial da marca (Gotham) e paga; Montserrat usada como substituta
// gratuita ate confirmar se ha licenca de webfont da Gotham.
const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const faustina = Faustina({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Multiplic Imóveis",
  description: PARAGUAI_ATIVO
    ? "Imóveis para venda no Brasil e empreendimentos no Paraguai."
    : "Imóveis para venda em Brasília e região.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${faustina.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
