// Dados de contato reais ainda pendentes - ajustar antes de publicar.
export const siteConfig = {
  nome: "Multiplic Imóveis",
  telefoneWhatsapp: "556199999999", // TODO: confirmar numero real (DDI+DDD+numero, sem simbolos)
  email: "contato@multiplicimoveis.com.br", // TODO: confirmar email real
  instagram: "https://instagram.com/multiplicimoveis", // TODO: confirmar
  cidadeBase: "Brasília - DF",
};

export function linkWhatsapp(mensagem: string) {
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${siteConfig.telefoneWhatsapp}?text=${texto}`;
}
