import Image from "next/image";
import Link from "next/link";
import { formatarPreco } from "@/lib/format";

const STATUS_LABEL: Record<string, string> = {
  PROJETO_NA_PLANTA: "Projeto na planta",
  EM_CONSTRUCAO: "Em construção",
  ENTREGUE: "Entregue",
};

export type DevelopmentCardData = {
  slug: string;
  nome: string;
  cidade: string;
  status: string;
  capaUrl?: string | null;
  precoAPartir?: number | null;
};

export function DevelopmentCard({ empreendimento }: { empreendimento: DevelopmentCardData }) {
  return (
    <Link
      href={`/paraguai/${empreendimento.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm transition-colors hover:bg-white/10"
    >
      <div className="relative h-48 bg-gradient-to-br from-brand-red/20 to-brand-gray/40">
        {empreendimento.capaUrl ? (
          <Image
            src={empreendimento.capaUrl}
            alt={empreendimento.nome}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-white/40" fill="currentColor">
              <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
          {STATUS_LABEL[empreendimento.status] ?? empreendimento.status}
        </span>
        <h3 className="mt-3 font-heading text-lg font-semibold text-white">
          {empreendimento.nome}
        </h3>
        <p className="text-sm text-white/60">{empreendimento.cidade}, Paraguai</p>

        <p className="mt-4 text-sm font-semibold text-white/90">
          {empreendimento.precoAPartir
            ? `Unidades a partir de ${formatarPreco(empreendimento.precoAPartir, "USD")}`
            : "Consulte disponibilidade"}
        </p>
      </div>
    </Link>
  );
}
