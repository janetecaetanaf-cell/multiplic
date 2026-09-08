const STATUS_VALIDOS = ["DISPONIVEL", "RESERVADA", "VENDIDA"] as const;
export type StatusUnidade = (typeof STATUS_VALIDOS)[number];

export function parseUnidadeInput(body: Record<string, unknown>) {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const num = (v: unknown) => (v === "" || v === undefined || v === null ? null : Number(v));
  const statusBruto = str(body.status);
  const status: StatusUnidade = (STATUS_VALIDOS as readonly string[]).includes(statusBruto)
    ? (statusBruto as StatusUnidade)
    : "DISPONIVEL";

  return {
    empreendimentoId: str(body.empreendimentoId),
    codigo: str(body.codigo),
    andar: num(body.andar),
    tipo: str(body.tipo),
    areaTotal: num(body.areaTotal) ?? 0,
    preco: num(body.preco) ?? 0,
    status,
  };
}
