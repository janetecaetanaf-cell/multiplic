import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EmpreendimentoForm } from "@/components/admin/EmpreendimentoForm";

export const metadata = { title: "Editar empreendimento | Admin Multiplic" };

export default async function EditarEmpreendimentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const empreendimento = await prisma.empreendimento.findUnique({
    where: { id },
    include: { materiais: { where: { tipo: "RENDER" }, orderBy: { ordem: "asc" } } },
  });

  if (!empreendimento) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-gray">Editar empreendimento</h1>
      <div className="mt-6">
        <EmpreendimentoForm
          valoresIniciais={{
            id: empreendimento.id,
            nome: empreendimento.nome,
            cidade: empreendimento.cidade,
            status: empreendimento.status,
            descricaoPt: empreendimento.descricaoPt ?? "",
            descricaoEs: empreendimento.descricaoEs ?? "",
            destaque: empreendimento.destaque,
            publicado: empreendimento.publicado,
            renders: empreendimento.materiais.map((m) => ({ url: m.url })),
          }}
        />
      </div>
    </div>
  );
}
