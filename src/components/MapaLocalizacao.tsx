"use client";

import { useState } from "react";

// So carrega o iframe pesado do Google Maps quando a pessoa pedir -
// evita que a pagina fique lenta pra todo mundo so pra mostrar um mapa
// que nem todo visitante vai querer ver.
export function MapaLocalizacao({ query, titulo }: { query: string; titulo: string }) {
  const [carregado, setCarregado] = useState(false);

  if (!carregado) {
    return (
      <button
        type="button"
        onClick={() => setCarregado(true)}
        className="flex h-80 w-full flex-col items-center justify-center gap-3 bg-neutral-100 text-brand-gray/70 transition-colors hover:bg-neutral-200"
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span className="text-sm font-semibold">Ver mapa da localização</span>
      </button>
    );
  }

  return (
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      width="100%"
      height="320"
      style={{ border: 0 }}
      referrerPolicy="no-referrer-when-downgrade"
      title={`Localização de ${titulo}`}
    />
  );
}
