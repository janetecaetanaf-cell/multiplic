import { EmpreendimentoForm } from "@/components/admin/EmpreendimentoForm";

export const metadata = { title: "Novo empreendimento | Admin Multiplic" };

export default function NovoEmpreendimentoPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-gray">Novo empreendimento</h1>
      <div className="mt-6">
        <EmpreendimentoForm />
      </div>
    </div>
  );
}
