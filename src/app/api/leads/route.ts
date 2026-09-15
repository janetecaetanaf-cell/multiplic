import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ORIGENS_PERMITIDAS = ["SITE_BR", "SITE_PY", "ANABB"] as const;

export async function POST(req: Request) {
  const body = await req.json();
  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const telefone = typeof body.telefone === "string" ? body.telefone.trim() : "";
  const mensagem = typeof body.mensagem === "string" ? body.mensagem.trim() : null;
  const matricula = typeof body.matricula === "string" ? body.matricula.trim() || null : null;
  const origem = ORIGENS_PERMITIDAS.includes(body.origem) ? body.origem : "SITE_BR";

  if (!nome || !telefone) {
    return NextResponse.json({ erro: "Nome e telefone são obrigatórios" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: { nome, telefone, mensagem, matricula, origem },
  });

  return NextResponse.json({ id: lead.id });
}
