export function gerarSlug(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const STATUS_VALIDOS = ["PROJETO_NA_PLANTA", "EM_CONSTRUCAO", "ENTREGUE"] as const;
export type StatusEmpreendimento = (typeof STATUS_VALIDOS)[number];

export function parseEmpreendimentoInput(body: Record<string, unknown>) {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const statusBruto = str(body.status);
  const status: StatusEmpreendimento = (STATUS_VALIDOS as readonly string[]).includes(statusBruto)
    ? (statusBruto as StatusEmpreendimento)
    : "EM_CONSTRUCAO";

  const renders = Array.isArray(body.renders)
    ? (body.renders as { url: string }[]).map((img, i) => ({
        url: img.url,
        nomeArquivo: img.url.split("/").pop() ?? "render",
        tipo: "RENDER" as const,
        publico: true,
        ordem: i,
      }))
    : [];

  return {
    nome: str(body.nome),
    cidade: str(body.cidade),
    status,
    descricaoPt: str(body.descricaoPt) || null,
    descricaoEs: str(body.descricaoEs) || null,
    destaque: Boolean(body.destaque),
    publicado: Boolean(body.publicado),
    renders,
  };
}
