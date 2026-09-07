import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { atendido } = await req.json();

  await prisma.lead.update({
    where: { id },
    data: { atendido: Boolean(atendido) },
  });

  return NextResponse.json({ ok: true });
}
