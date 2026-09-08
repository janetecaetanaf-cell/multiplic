"use client";

import { useState } from "react";
import { formatarPreco } from "@/lib/format";

export type UnidadePublica = {
  id: string;
  codigo: string;
  andar: number | null;
  tipo: string;
  areaTotal: string;
  preco: string;
};

export function UnidadesDisponiveis({ unidades }: { unidades: UnidadePublica[] }) {
  const [aberto, setAberto] = useState(false);

  if (unidades.length === 0) {
    return (
      <p className="text-brand-gray/60">
        Sem unidades disponíveis no momento — fale com a gente para saber sobre a
        próxima liberação.
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
      >
        {aberto ? "Ocultar unidades" : `Ver unidades disponíveis (${unidades.length})`}
      </button>

      {aberto && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-brand-gray/60">
              <tr>
                <th className="px-5 py-3">Unidade</th>
                <th className="px-5 py-3">Andar</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">m²</th>
                <th className="px-5 py-3">Preço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {unidades.map((u) => (
                <tr key={u.id}>
                  <td className="px-5 py-3 font-medium text-brand-gray">{u.codigo}</td>
                  <td className="px-5 py-3 text-brand-gray/70">{u.andar ?? "—"}</td>
                  <td className="px-5 py-3 text-brand-gray/70">{u.tipo}</td>
                  <td className="px-5 py-3 text-brand-gray/70">{u.areaTotal}</td>
                  <td className="px-5 py-3 font-semibold text-brand-gray">
                    {formatarPreco(Number(u.preco), "USD")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
