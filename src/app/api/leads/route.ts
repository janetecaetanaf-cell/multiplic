import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const telefone = typeof body.telefone === "string" ? body.telefone.trim() : "";
  const mensagem = typeof body.mensagem === "string" ? body.mensagem.trim() : null;

  if (!nome || !telefone) {
    return NextResponse.json({ erro: "Nome e telefone são obrigatórios" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: { nome, telefone, mensagem, origem: "SITE_BR" },
  });

  return NextResponse.json({ id: lead.id });
}
