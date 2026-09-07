"use client";

import { useState } from "react";
import { linkWhatsapp } from "@/lib/site-config";

// Ainda sem banco ligado: o envio abre o WhatsApp com a mensagem pronta.
// Quando o banco estiver no ar, isso passa a gravar em /api/leads tambem.
export function ContactForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  const podeEnviar = nome.trim() !== "" && telefone.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;

    const texto = `Olá! Meu nome é ${nome} (${telefone}).\n${mensagem || "Gostaria de mais informações sobre os imóveis."}`;
    window.open(linkWhatsapp(texto), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-brand-gray">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-brand-gray focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-brand-gray">
          Telefone / WhatsApp
        </label>
        <input
          id="telefone"
          type="tel"
          required
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-brand-gray focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-brand-gray">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Conte um pouco sobre o que você procura"
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-brand-gray focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>

      <button
        type="submit"
        disabled={!podeEnviar}
        className="w-full rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        Enviar pelo WhatsApp
      </button>
    </form>
  );
}
