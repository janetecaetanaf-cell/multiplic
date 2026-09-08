import { readFile } from "fs/promises";
import { importarUnidadesDeArquivo } from "../src/lib/xlsx-unidades.ts";

const arquivos = [
  "V Tower Riviera.xlsx",
  "LISTA DE PRECIOS V TOWER DEL LAGO.xlsx",
  "V Tower Boggiani.xlsx",
  "Disponibilidad V-Tower Recoleta.xlsx",
  "V TOWER MARISCAL.xlsx",
  "Disponibilidad Fernando.xlsx",
];

for (const nome of arquivos) {
  const caminho = `C:\\Users\\Janete\\Downloads\\${nome}`;
  const buffer = await readFile(caminho);
  const { unidades, avisos } = await importarUnidadesDeArquivo(buffer);

  const porStatus: Record<string, number> = {};
  for (const u of unidades) porStatus[u.status] = (porStatus[u.status] ?? 0) + 1;

  console.log("=".repeat(70));
  console.log(nome);
  console.log("total unidades:", unidades.length, "| por status:", porStatus);
  console.log("amostra:", unidades.slice(0, 3));
  console.log("ultimas:", unidades.slice(-2));
  if (avisos.length) console.log("avisos:", avisos.slice(0, 5));
}
