export const siteConfig = {
  nome: "Multiplic Imóveis",
  // WhatsApp da Joana (dona da Multiplic, responsavel pelos atendimentos)
  telefoneWhatsapp: "5561984219241",
  email: "contato@multiplicimoveis.com.br", // TODO: confirmar email real
  instagram: "https://instagram.com/multiplicimoveis", // TODO: confirmar
  cidadeBase: "Brasília - DF",
};

export function linkWhatsapp(mensagem: string) {
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${siteConfig.telefoneWhatsapp}?text=${texto}`;
}
