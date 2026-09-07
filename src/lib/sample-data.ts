// Dados de exemplo para montar o layout antes da ligacao com o banco real.
// O formato ja espelha os modelos do Prisma (Imovel / Empreendimento) para
// facilitar a troca por dados reais mais tarde.

export type ImovelDestaque = {
  id: string;
  titulo: string;
  cidade: string;
  bairro: string;
  preco: number;
  tipo: string;
  quartos: number;
  banheiros: number;
  areaUtil: number;
};

export const imoveisDestaque: ImovelDestaque[] = [
  {
    id: "1",
    titulo: "Apartamento em Águas Claras",
    cidade: "Brasília",
    bairro: "Águas Claras - Norte",
    preco: 1033500,
    tipo: "Apartamento",
    quartos: 3,
    banheiros: 3,
    areaUtil: 90.7,
  },
  {
    id: "2",
    titulo: "Casa em Vicente Pires",
    cidade: "Brasília",
    bairro: "Vicente Pires",
    preco: 1234000,
    tipo: "Casa",
    quartos: 7,
    banheiros: 4,
    areaUtil: 270,
  },
  {
    id: "3",
    titulo: "Apartamento no Guará",
    cidade: "Brasília",
    bairro: "Guará II",
    preco: 240000,
    tipo: "Apartamento",
    quartos: 2,
    banheiros: 2,
    areaUtil: 55,
  },
];

export type Empreendimento = {
  slug: string;
  nome: string;
  cidade: string;
  status: "EM_CONSTRUCAO" | "PROJETO_NA_PLANTA";
};

export const empreendimentosParaguai: Empreendimento[] = [
  { slug: "v-tower-boggiani", nome: "V Tower Boggiani", cidade: "Asunción", status: "EM_CONSTRUCAO" },
  { slug: "v-tower-riviera", nome: "V Tower Riviera", cidade: "Encarnación", status: "EM_CONSTRUCAO" },
  { slug: "v-tower-del-lago", nome: "V Tower Del Lago", cidade: "Ciudad del Este", status: "EM_CONSTRUCAO" },
  { slug: "v-tower-recoleta", nome: "V Tower Recoleta", cidade: "Asunción", status: "EM_CONSTRUCAO" },
  { slug: "v-tower-mariscal", nome: "V Tower Mariscal", cidade: "Asunción", status: "PROJETO_NA_PLANTA" },
  { slug: "v-tower-fernando", nome: "V Tower Fernando", cidade: "Fernando de la Mora", status: "EM_CONSTRUCAO" },
  { slug: "v-residence-pjc", nome: "V Residence Pedro Juan Caballero", cidade: "Pedro Juan Caballero", status: "EM_CONSTRUCAO" },
  { slug: "v-residence-casablanca", nome: "V Residence Casablanca", cidade: "San Bernardino", status: "PROJETO_NA_PLANTA" },
];

export function formatarPreco(valor: number, moeda: "BRL" | "USD" = "BRL") {
  return new Intl.NumberFormat(moeda === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: moeda,
    maximumFractionDigits: 0,
  }).format(valor);
}
