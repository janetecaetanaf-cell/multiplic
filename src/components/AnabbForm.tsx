"use client";

import { useState } from "react";
import { linkWhatsapp } from "@/lib/site-config";

export function AnabbForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [matricula, setMatricula] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  const podeEnviar = nome.trim() !== "" && telefone.trim() !== "" && matricula.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone, matricula, mensagem, origem: "ANABB" }),
    }).catch(() => {
      // Falha ao salvar o lead nao deve impedir o contato via WhatsApp.
    });

    const texto = `Olá! Sou associado(a) ANABB.\nNome: ${nome}\nMatrícula/CPF: ${matricula}\n${mensagem || "Gostaria de saber mais sobre as condições especiais da Multiplic Imóveis."}`;
    window.open(linkWhatsapp(texto), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  if (enviado) {
    return (
      <p className="rounded-xl bg-green-50 px-5 py-4 text-sm text-green-800">
        Recebemos seus dados! Um corretor da Multiplic vai confirmar seu
        cadastro ANABB e entrar em contato em breve.
      </p>
    );
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
        <label htmlFor="matricula" className="block text-sm font-medium text-brand-gray">
          Matrícula ANABB ou CPF
        </label>
        <input
          id="matricula"
          type="text"
          required
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          placeholder="Usado só para confirmar seu cadastro no convênio"
          className="mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-brand-gray focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-brand-gray">
          Mensagem (opcional)
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
