"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ url, confirmMsg }: { url: string; confirmMsg: string }) {
  const router = useRouter();
  const [excluindo, setExcluindo] = useState(false);

  async function handleDelete() {
    if (!confirm(confirmMsg)) return;
    setExcluindo(true);
    await fetch(url, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={excluindo}
      className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {excluindo ? "Excluindo..." : "Excluir"}
    </button>
  );
}
