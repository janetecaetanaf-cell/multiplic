"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader, ImagemForm } from "@/components/admin/ImageUploader";

export type ImovelFormValues = {
  id?: string;
  titulo: string;
  descricao: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  preco: string;
  tipo: string;
  quartos: string;
  suites: string;
  banheiros: string;
  areaUtil: string;
  areaTotal: string;
  vagas: string;
  destaque: boolean;
  disponivel: boolean;
  imagens: ImagemForm[];
};

const VAZIO: ImovelFormValues = {
  titulo: "",
  descricao: "",
  endereco: "",
  cidade: "",
  estado: "",
  cep: "",
  preco: "",
  tipo: "Apartamento",
  quartos: "0",
  suites: "0",
  banheiros: "0",
  areaUtil: "",
  areaTotal: "",
  vagas: "0",
  destaque: false,
  disponivel: true,
  imagens: [],
};

export function ImovelForm({ valoresIniciais }: { valoresIniciais?: ImovelFormValues }) {
  const router = useRouter();
  const [valores, setValores] = useState<ImovelFormValues>(valoresIniciais ?? VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const editando = Boolean(valores.id);

  function set<K extends keyof ImovelFormValues>(campo: K, valor: ImovelFormValues[K]) {
    setValores((v) => ({ ...v, [campo]: valor }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);

    const url = editando ? `/api/admin/imoveis/${valores.id}` : "/api/admin/imoveis";
    const method = editando ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valores),
    });

    setSalvando(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setErro(data?.erro ?? "Não foi possível salvar");
      return;
    }

    router.push("/admin/imoveis");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {erro && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{erro}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-brand-gray">Título</label>
        <input
          required
          value={valores.titulo}
          onChange={(e) => set("titulo", e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-gray">Descrição</label>
        <textarea
          rows={4}
          value={valores.descricao}
          onChange={(e) => set("descricao", e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brand-gray">Endereço</label>
          <input
            required
            value={valores.endereco}
            onChange={(e) => set("endereco", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Cidade</label>
          <input
            required
            value={valores.cidade}
            onChange={(e) => set("cidade", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-gray">UF</label>
            <input
              required
              maxLength={2}
              value={valores.estado}
              onChange={(e) => set("estado", e.target.value.toUpperCase())}
              className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 uppercase"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-gray">CEP</label>
            <input
              value={valores.cep}
              onChange={(e) => set("cep", e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-brand-gray">Tipo</label>
          <select
            value={valores.tipo}
            onChange={(e) => set("tipo", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          >
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Terreno</option>
            <option>Comercial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Preço (R$)</label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={valores.preco}
            onChange={(e) => set("preco", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Vagas de garagem</label>
          <input
            type="number"
            min="0"
            value={valores.vagas}
            onChange={(e) => set("vagas", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Quartos</label>
          <input
            type="number"
            min="0"
            value={valores.quartos}
            onChange={(e) => set("quartos", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Suítes</label>
          <input
            type="number"
            min="0"
            value={valores.suites}
            onChange={(e) => set("suites", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Banheiros</label>
          <input
            type="number"
            min="0"
            value={valores.banheiros}
            onChange={(e) => set("banheiros", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Área útil (m²)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={valores.areaUtil}
            onChange={(e) => set("areaUtil", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Área total (m²)</label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={valores.areaTotal}
            onChange={(e) => set("areaTotal", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-brand-gray">
          <input
            type="checkbox"
            checked={valores.destaque}
            onChange={(e) => set("destaque", e.target.checked)}
          />
          Destaque na home
        </label>
        <label className="flex items-center gap-2 text-sm text-brand-gray">
          <input
            type="checkbox"
            checked={valores.disponivel}
            onChange={(e) => set("disponivel", e.target.checked)}
          />
          Disponível (visível no site)
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-gray">Fotos</label>
        <div className="mt-2">
          <ImageUploader
            pasta="imoveis"
            imagens={valores.imagens}
            onChange={(imagens) => set("imagens", imagens)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={salvando}
        className="rounded-full bg-brand-red px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
      >
        {salvando ? "Salvando..." : "Salvar imóvel"}
      </button>
    </form>
  );
}
