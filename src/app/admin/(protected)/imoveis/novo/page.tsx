import { ImovelForm } from "@/components/admin/ImovelForm";

export const metadata = { title: "Novo imóvel | Admin Multiplic" };

export default function NovoImovelPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-gray">Novo imóvel</h1>
      <div className="mt-6">
        <ImovelForm />
      </div>
    </div>
  );
}
