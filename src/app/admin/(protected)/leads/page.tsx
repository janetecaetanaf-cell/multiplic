import { prisma } from "@/lib/prisma";
import { MarcarAtendidoButton } from "@/components/admin/MarcarAtendidoButton";

export const metadata = { title: "Mensagens | Admin Multiplic" };

const ORIGEM_LABEL: Record<string, string> = {
  SITE_BR: "Site (Brasil)",
  SITE_PY: "Site (Paraguai)",
  WHATSAPP: "WhatsApp",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: [{ atendido: "asc" }, { createdAt: "desc" }],
    include: { imovel: true, empreendimento: true, corretor: true },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-gray">Mensagens recebidas</h1>

      <div className="mt-6 space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-brand-gray">{lead.nome}</p>
                <p className="text-sm text-brand-gray/60">{lead.telefone}</p>
              </div>
              <span
                className={
                  lead.atendido
                    ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
                    : "rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800"
                }
              >
                {lead.atendido ? "Atendido" : "Pendente"}
              </span>
            </div>

            {lead.mensagem && (
              <p className="mt-3 text-sm text-brand-gray/80">{lead.mensagem}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-brand-gray/50">
              <span>{ORIGEM_LABEL[lead.origem] ?? lead.origem}</span>
              <span>{lead.createdAt.toLocaleString("pt-BR")}</span>
              {lead.imovel && <span>Imóvel: {lead.imovel.titulo}</span>}
              {lead.empreendimento && <span>Empreendimento: {lead.empreendimento.nome}</span>}
              {lead.corretor && <span>Corretor: {lead.corretor.nome}</span>}
            </div>

            <div className="mt-4">
              <MarcarAtendidoButton id={lead.id} atendido={lead.atendido} />
            </div>
          </div>
        ))}

        {leads.length === 0 && (
          <p className="rounded-2xl border border-black/5 bg-white p-8 text-center text-brand-gray/50">
            Nenhuma mensagem recebida ainda.
          </p>
        )}
      </div>
    </div>
  );
}
