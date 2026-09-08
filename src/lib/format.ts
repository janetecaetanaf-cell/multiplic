export function formatarPreco(valor: number, moeda: "BRL" | "USD" = "BRL") {
  return new Intl.NumberFormat(moeda === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: moeda,
    maximumFractionDigits: 0,
  }).format(valor);
}
