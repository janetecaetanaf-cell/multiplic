"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type Unidade = {
  id: string;
  codigo: string;
  andar: number | null;
  tipo: string;
  areaTotal: string;
  preco: string;
  status: "DISPONIVEL" | "RESERVADA" | "VENDIDA";
};

const STATUS_LABEL: Record<Unidade["status"], string> = {
  DISPONIVEL: "Disponível",
  RESERVADA: "Reservada",
  VENDIDA: "Vendida",
};

const VAZIO = {
  codigo: "",
  andar: "",
  tipo: "",
  areaTotal: "",
  preco: "",
  status: "DISPONIVEL" as Unidade["status"],
};

export function UnidadesManager({
  empreendimentoId,
  unidadesIniciais,
}: {
  empreendimentoId: string;
  unidadesIniciais: Unidade[];
}) {
  const router = useRouter();
  const [unidades, setUnidades] = useState(unidadesIniciais);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function iniciarEdicao(u: Unidade) {
    setEditandoId(u.id);
    setForm({
      codigo: u.codigo,
      andar: u.andar?.toString() ?? "",
      tipo: u.tipo,
      areaTotal: u.areaTotal,
      preco: u.preco,
      status: u.status,
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setForm(VAZIO);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);

    const url = editandoId ? `/api/admin/unidades/${editandoId}` : "/api/admin/unidades";
    const method = editandoId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, empreendimentoId }),
    });

    setSalvando(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setErro(data?.erro ?? "Não foi possível salvar");
      return;
    }

    cancelarEdicao();
    router.refresh();

    // Atualiza a lista local de forma otimista enquanto o refresh do
    // server component nao chega.
    if (editandoId) {
      setUnidades((atual) =>
        atual.map((u) =>
          u.id === editandoId ? { ...u, ...form, id: editandoId } : u
        )
      );
    } else {
      const data = await res.json();
      setUnidades((atual) => [...atual, { ...form, id: data.id }]);
    }
  }

  async function excluir(id: string) {
    if (!confirm("Excluir esta unidade?")) return;
    await fetch(`/api/admin/unidades/${id}`, { method: "DELETE" });
    setUnidades((atual) => atual.filter((u) => u.id !== id));
    router.refresh();
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 rounded-2xl border border-black/5 bg-white p-5 sm:grid-cols-6"
      >
        {erro && (
          <p className="col-span-full rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {erro}
          </p>
        )}

        <div>
          <label className="block text-xs font-medium text-brand-gray">Unidade</label>
          <input
            required
            value={form.codigo}
            onChange={(e) => setForm((f) => ({ ...f, codigo: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-gray">Andar</label>
          <input
            type="number"
            value={form.andar}
            onChange={(e) => setForm((f) => ({ ...f, andar: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-gray">Tipo</label>
          <input
            required
            placeholder="Mono, 2 dorm..."
            value={form.tipo}
            onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-gray">m²</label>
          <input
            required
            type="number"
            step="0.01"
            value={form.areaTotal}
            onChange={(e) => setForm((f) => ({ ...f, areaTotal: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-gray">Preço (US$)</label>
          <input
            required
            type="number"
            step="0.01"
            value={form.preco}
            onChange={(e) => setForm((f) => ({ ...f, preco: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-gray">Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({ ...f, status: e.target.value as Unidade["status"] }))
            }
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          >
            <option value="DISPONIVEL">Disponível</option>
            <option value="RESERVADA">Reservada</option>
            <option value="VENDIDA">Vendida</option>
          </select>
        </div>

        <div className="col-span-full flex gap-3">
          <button
            type="submit"
            disabled={salvando}
            className="rounded-full bg-brand-red px-6 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark disabled:opacity-60"
          >
            {editandoId ? "Salvar alterações" : "+ Adicionar unidade"}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={cancelarEdicao}
              className="text-sm font-medium text-brand-gray/60 hover:text-brand-gray"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-brand-gray/60">
            <tr>
              <th className="px-5 py-3">Unidade</th>
              <th className="px-5 py-3">Andar</th>
              <th className="px-5 py-3">Tipo</th>
              <th className="px-5 py-3">m²</th>
              <th className="px-5 py-3">Preço</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {unidades.map((u) => (
              <tr key={u.id}>
                <td className="px-5 py-3 font-medium text-brand-gray">{u.codigo}</td>
                <td className="px-5 py-3 text-brand-gray/70">{u.andar ?? "—"}</td>
                <td className="px-5 py-3 text-brand-gray/70">{u.tipo}</td>
                <td className="px-5 py-3 text-brand-gray/70">{u.areaTotal}</td>
                <td className="px-5 py-3 text-brand-gray/70">US$ {Number(u.preco).toLocaleString("en-US")}</td>
                <td className="px-5 py-3 text-brand-gray/70">{STATUS_LABEL[u.status]}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => iniciarEdicao(u)}
                      className="text-sm font-medium text-brand-red hover:text-brand-red-dark"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => excluir(u.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {unidades.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-brand-gray/50">
                  Nenhuma unidade cadastrada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
