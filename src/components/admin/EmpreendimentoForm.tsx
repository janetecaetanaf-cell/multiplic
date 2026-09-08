"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader, ImagemForm } from "@/components/admin/ImageUploader";

export type EmpreendimentoFormValues = {
  id?: string;
  nome: string;
  cidade: string;
  status: "PROJETO_NA_PLANTA" | "EM_CONSTRUCAO" | "ENTREGUE";
  descricaoPt: string;
  descricaoEs: string;
  destaque: boolean;
  publicado: boolean;
  renders: ImagemForm[];
};

const VAZIO: EmpreendimentoFormValues = {
  nome: "",
  cidade: "",
  status: "EM_CONSTRUCAO",
  descricaoPt: "",
  descricaoEs: "",
  destaque: false,
  publicado: false,
  renders: [],
};

export function EmpreendimentoForm({
  valoresIniciais,
}: {
  valoresIniciais?: EmpreendimentoFormValues;
}) {
  const router = useRouter();
  const [valores, setValores] = useState<EmpreendimentoFormValues>(valoresIniciais ?? VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const editando = Boolean(valores.id);

  function set<K extends keyof EmpreendimentoFormValues>(
    campo: K,
    valor: EmpreendimentoFormValues[K]
  ) {
    setValores((v) => ({ ...v, [campo]: valor }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);

    const url = editando
      ? `/api/admin/empreendimentos/${valores.id}`
      : "/api/admin/empreendimentos";
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

    router.push("/admin/empreendimentos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {erro && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{erro}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-brand-gray">Nome</label>
          <input
            required
            value={valores.nome}
            onChange={(e) => set("nome", e.target.value)}
            placeholder="Ex: V Tower Boggiani"
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-gray">Cidade</label>
          <input
            required
            value={valores.cidade}
            onChange={(e) => set("cidade", e.target.value)}
            placeholder="Ex: Asunción"
            className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-gray">Status</label>
        <select
          value={valores.status}
          onChange={(e) => set("status", e.target.value as EmpreendimentoFormValues["status"])}
          className="mt-1 w-full max-w-xs rounded-lg border border-black/10 px-4 py-2.5"
        >
          <option value="PROJETO_NA_PLANTA">Projeto na planta</option>
          <option value="EM_CONSTRUCAO">Em construção</option>
          <option value="ENTREGUE">Entregue</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-gray">
          Descrição (português)
        </label>
        <textarea
          rows={4}
          value={valores.descricaoPt}
          onChange={(e) => set("descricaoPt", e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-gray">
          Descripción (español) <span className="font-normal text-brand-gray/50">— opcional</span>
        </label>
        <textarea
          rows={4}
          value={valores.descricaoEs}
          onChange={(e) => set("descricaoEs", e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5"
        />
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
            checked={valores.publicado}
            onChange={(e) => set("publicado", e.target.checked)}
          />
          Publicado (visível no site)
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-gray">Renders / fotos</label>
        <div className="mt-2">
          <ImageUploader
            pasta="empreendimentos"
            imagens={valores.renders}
            onChange={(renders) => set("renders", renders)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={salvando}
        className="rounded-full bg-brand-red px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
      >
        {salvando ? "Salvando..." : "Salvar empreendimento"}
      </button>
    </form>
  );
}
