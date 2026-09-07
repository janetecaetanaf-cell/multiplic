export function parseImovelInput(body: Record<string, unknown>) {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const num = (v: unknown) => (v === "" || v === undefined || v === null ? null : Number(v));

  const imagens = Array.isArray(body.imagens)
    ? (body.imagens as { url: string }[]).map((img, i) => ({ url: img.url, ordem: i }))
    : [];

  return {
    titulo: str(body.titulo),
    descricao: str(body.descricao) || null,
    endereco: str(body.endereco),
    cidade: str(body.cidade),
    estado: str(body.estado).toUpperCase(),
    cep: str(body.cep) || null,
    preco: num(body.preco) ?? 0,
    tipo: str(body.tipo),
    quartos: num(body.quartos) ?? 0,
    suites: num(body.suites) ?? 0,
    banheiros: num(body.banheiros) ?? 0,
    areaUtil: num(body.areaUtil),
    areaTotal: num(body.areaTotal) ?? 0,
    vagas: num(body.vagas) ?? 0,
    destaque: Boolean(body.destaque),
    disponivel: Boolean(body.disponivel),
    imagens,
  };
}
