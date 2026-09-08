"use client";

import { useState } from "react";
import Image from "next/image";

export function GaleriaEmpreendimento({
  imagens,
  nome,
}: {
  imagens: string[];
  nome: string;
}) {
  const [ativo, setAtivo] = useState(0);

  if (imagens.length === 0) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-16 w-16 text-white/30" fill="currentColor">
          <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z" />
        </svg>
      </div>
    );
  }

  function anterior() {
    setAtivo((i) => (i - 1 + imagens.length) % imagens.length);
  }

  function proxima() {
    setAtivo((i) => (i + 1) % imagens.length);
  }

  return (
    <div>
      <div className="relative h-[50vh] w-full">
        <Image
          key={imagens[ativo]}
          src={imagens[ativo]}
          alt={nome}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-gray/80 via-transparent to-transparent" />

        {imagens.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={proxima}
              aria-label="Próxima foto"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {imagens.length > 1 && (
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 px-6 pb-6 lg:px-8">
          {imagens.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setAtivo(i)}
              className={`relative h-24 overflow-hidden rounded-lg transition-opacity ${
                i === ativo ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
