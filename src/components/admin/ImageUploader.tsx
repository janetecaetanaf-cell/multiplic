"use client";

import { useRef, useState } from "react";

export type ImagemForm = { url: string };

export function ImageUploader({
  pasta,
  imagens,
  onChange,
}: {
  pasta: string;
  imagens: ImagemForm[];
  onChange: (imagens: ImagemForm[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErro(null);
    setEnviando(true);

    const novas: ImagemForm[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pasta", pasta);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setErro(data?.erro ?? "Falha ao enviar imagem");
        continue;
      }
      novas.push({ url: data.url });
    }

    onChange([...imagens, ...novas]);
    setEnviando(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remover(url: string) {
    onChange(imagens.filter((img) => img.url !== url));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {imagens.map((img) => (
          <div key={img.url} className="group relative h-24 w-24 overflow-hidden rounded-lg border border-black/10">
            {/* Preview simples - nao precisa de otimizacao do Next/Image aqui */}
            <img src={img.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remover(img.url)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remover imagem"
            >
              ×
            </button>
          </div>
        ))}

        <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border border-dashed border-black/20 text-xs text-brand-gray/60 hover:border-brand-red hover:text-brand-red">
          {enviando ? "Enviando..." : "+ Foto"}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={enviando}
          />
        </label>
      </div>
      {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
    </div>
  );
}
