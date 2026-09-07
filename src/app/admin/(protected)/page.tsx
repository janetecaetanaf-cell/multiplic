import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Painel | Admin Multiplic" };

export default async function AdminDashboard() {
  const [totalImoveis, totalEmpreendimentos, leadsNaoAtendidos] = await Promise.all([
    prisma.imovel.count(),
    prisma.empreendimento.count(),
    prisma.lead.count({ where: { atendido: false } }),
  ]);

  const cards = [
    { label: "Imóveis cadastrados (Brasil)", valor: totalImoveis, href: "/admin/imoveis" },
    { label: "Empreendimentos (Paraguai)", valor: totalEmpreendimentos, href: "/admin/empreendimentos" },
    { label: "Mensagens não atendidas", valor: leadsNaoAtendidos, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-gray">Painel</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-brand-gray/60">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-brand-gray">{c.valor}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
