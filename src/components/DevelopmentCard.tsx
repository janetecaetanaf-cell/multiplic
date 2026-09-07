import { Empreendimento } from "@/lib/sample-data";

const STATUS_LABEL: Record<Empreendimento["status"], string> = {
  EM_CONSTRUCAO: "Em construção",
  PROJETO_NA_PLANTA: "Projeto na planta",
};

export function DevelopmentCard({ empreendimento }: { empreendimento: Empreendimento }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm transition-colors hover:bg-white/10">
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-red/20 to-brand-gray/40">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-white/40" fill="currentColor">
          <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z" />
        </svg>
      </div>

      <div className="p-5">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
          {STATUS_LABEL[empreendimento.status]}
        </span>
        <h3 className="mt-3 font-heading text-lg font-semibold text-white">
          {empreendimento.nome}
        </h3>
        <p className="text-sm text-white/60">{empreendimento.cidade}, Paraguai</p>

        <p className="mt-4 text-sm font-semibold text-white/90">
          Consulte valores e disponibilidade
        </p>
      </div>
    </article>
  );
}
