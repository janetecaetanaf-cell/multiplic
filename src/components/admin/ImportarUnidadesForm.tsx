"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Resultado = {
  totalNaPlanilha: number;
  criadas: number;
  atualizadas: number;
  avisos: string[];
};

export function ImportarUnidadesForm({ empreendimentoId }: { empreendimentoId: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setEnviando(true);
    setErro(null);
    setResultado(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/admin/empreendimentos/${empreendimentoId}/importar-unidades`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setEnviando(false);
    if (inputRef.current) inputRef.current.value = "";

    if (!res.ok) {
      setErro(data?.erro ?? "Não foi possível importar a planilha");
      return;
    }

    setResultado(data);
    router.refresh();
  }

  return (
    <div className="mb-6 rounded-2xl border border-black/5 bg-white p-5">
      <h2 className="font-heading text-sm font-semibold text-brand-gray">
        Importar planilha de preços
      </h2>
      <p className="mt-1 text-sm text-brand-gray/60">
        Sobe o arquivo .xlsx que a construtora manda (lista de unidades,
        preço e status). Unidades existentes são atualizadas; novas são
        criadas automaticamente.
      </p>

      <label className="mt-3 inline-block cursor-pointer rounded-full bg-brand-gray px-5 py-2 text-sm font-semibold text-white hover:bg-brand-gray/90">
        {enviando ? "Importando..." : "Escolher arquivo .xlsx"}
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleChange}
          disabled={enviando}
        />
      </label>

      {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}

      {resultado && (
        <div className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
          <p>
            {resultado.totalNaPlanilha} unidade(s) na planilha — {resultado.criadas} criada(s),{" "}
            {resultado.atualizadas} atualizada(s).
          </p>
          {resultado.avisos.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-yellow-800">
              {resultado.avisos.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
