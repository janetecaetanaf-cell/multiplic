// Dados de exemplo para montar o layout dos imoveis do Brasil antes do
// cadastro real (o Paraguai ja usa dado real do banco - ver paraguai-data.ts).

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
