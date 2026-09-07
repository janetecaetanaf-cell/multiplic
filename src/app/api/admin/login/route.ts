import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  if (!email || !senha) {
    return NextResponse.json({ erro: "Informe e-mail e senha" }, { status: 400 });
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario || !usuario.ativo) {
    return NextResponse.json({ erro: "E-mail ou senha inválidos" }, { status: 401 });
  }

  const senhaOk = await bcrypt.compare(senha, usuario.senhaHash);
  if (!senhaOk) {
    return NextResponse.json({ erro: "E-mail ou senha inválidos" }, { status: 401 });
  }

  const token = await createSessionToken({
    sub: usuario.id,
    email: usuario.email,
    nome: usuario.nome,
    papel: usuario.papel,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
