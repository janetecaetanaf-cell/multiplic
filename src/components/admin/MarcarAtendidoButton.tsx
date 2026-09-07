"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarcarAtendidoButton({ id, atendido }: { id: string; atendido: boolean }) {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  async function handleClick() {
    setCarregando(true);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ atendido: !atendido }),
    });
    router.refresh();
    setCarregando(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={carregando}
      className="text-sm font-medium text-brand-red hover:text-brand-red-dark disabled:opacity-50"
    >
      {atendido ? "Marcar como pendente" : "Marcar como atendido"}
    </button>
  );
}
