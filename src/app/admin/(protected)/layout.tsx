import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

const NAV = [
  { href: "/admin", label: "Painel" },
  { href: "/admin/imoveis", label: "Imóveis (Brasil)" },
  { href: "/admin/empreendimentos", label: "Empreendimentos (Paraguai)" },
  { href: "/admin/leads", label: "Mensagens" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // A pagina de login tem seu proprio layout simples (sem sidebar);
  // esse layout aqui so deveria valer para depois de autenticado, mas o
  // middleware ja bloqueia acesso sem sessao antes de chegar aqui.
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col bg-brand-gray text-white">
        <div className="flex items-center gap-2 px-6 py-5">
          <Image src="/brand/symbol.png" alt="" width={32} height={32} />
          <span className="font-heading font-semibold">Admin</span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
          <span className="truncate text-xs text-white/50">{session.nome}</span>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 bg-neutral-50 p-8">{children}</main>
    </div>
  );
}
