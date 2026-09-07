import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ImovelForm } from "@/components/admin/ImovelForm";

export const metadata = { title: "Editar imóvel | Admin Multiplic" };

export default async function EditarImovelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const imovel = await prisma.imovel.findUnique({
    where: { id },
    include: { imagens: { orderBy: { ordem: "asc" } } },
  });

  if (!imovel) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-gray">Editar imóvel</h1>
      <div className="mt-6">
        <ImovelForm
          valoresIniciais={{
            id: imovel.id,
            titulo: imovel.titulo,
            descricao: imovel.descricao ?? "",
            endereco: imovel.endereco,
            cidade: imovel.cidade,
            estado: imovel.estado,
            cep: imovel.cep ?? "",
            preco: String(imovel.preco),
            tipo: imovel.tipo,
            quartos: String(imovel.quartos),
            suites: String(imovel.suites),
            banheiros: String(imovel.banheiros),
            areaUtil: imovel.areaUtil ? String(imovel.areaUtil) : "",
            areaTotal: String(imovel.areaTotal),
            vagas: String(imovel.vagas),
            destaque: imovel.destaque,
            disponivel: imovel.disponivel,
            imagens: imovel.imagens.map((img) => ({ url: img.url })),
          }}
        />
      </div>
    </div>
  );
}
