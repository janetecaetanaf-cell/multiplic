import ExcelJS from "exceljs";

export type StatusUnidade = "DISPONIVEL" | "RESERVADA" | "VENDIDA";

export type UnidadeImportada = {
  codigo: string;
  andar: number | null;
  tipo: string;
  areaTotal: number;
  preco: number;
  status: StatusUnidade;
};

export type ResultadoImportacao = {
  unidades: UnidadeImportada[];
  avisos: string[];
};

// As planilhas de preco da construtora nao seguem um layout fixo (colunas
// mudam de ordem/nome, algumas tem coluna de status em texto, outras so
// marcam por cor de fundo da celula). Por isso o parser localiza as
// colunas pelo texto do cabecalho em vez de posicao fixa.

function normalizarTexto(valor: unknown): string {
  if (valor === null || valor === undefined) return "";
  return String(valor)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function normalizarCabecalho(valor: unknown): string {
  return normalizarTexto(valor)
    .toUpperCase()
    .replace(/M2S|MTS2|MT2|M²/g, "M2")
    .replace(/[^A-Z0-9$/]/g, "");
}

function semEspacos(valor: unknown): string {
  return normalizarTexto(valor).replace(/\s+/g, "").toLowerCase();
}

function parseNumero(valor: unknown): number | null {
  if (valor === null || valor === undefined || valor === "") return null;
  if (typeof valor === "number") return valor;
  if (valor instanceof Date) return null;
  if (typeof valor === "object" && valor !== null && "result" in valor) {
    // celula com formula (ExcelJS retorna { formula, result })
    return parseNumero((valor as { result: unknown }).result);
  }

  const bruto = String(valor).replace(/[^0-9.,-]/g, "");
  if (!bruto) return null;

  // So existe fracao decimal se o ultimo separador vier seguido de 1 ou 2
  // digitos ate o fim (padrao de centavos). "167,090" e "1.234.567" tem 3
  // digitos depois do separador -> e milhar, nao decimal.
  const match = bruto.match(/[.,](\d{1,2})$/);
  let normalizado: string;
  if (match) {
    const idx = bruto.length - match[0].length;
    const inteiro = bruto.slice(0, idx).replace(/[.,]/g, "");
    normalizado = `${inteiro}.${match[1]}`;
  } else {
    normalizado = bruto.replace(/[.,]/g, "");
  }

  const n = parseFloat(normalizado);
  return Number.isFinite(n) ? n : null;
}

function corDaCelula(cell: ExcelJS.Cell): { argb: string; temPreenchimento: boolean } {
  const fill = cell.fill as ExcelJS.FillPattern | undefined;
  if (!fill || fill.type !== "pattern" || fill.pattern !== "solid" || !fill.fgColor) {
    return { argb: "", temPreenchimento: false };
  }
  const argb = fill.fgColor.argb;
  if (!argb || argb === "00000000") return { argb: "", temPreenchimento: false };
  return { argb, temPreenchimento: true };
}

function distanciaCor(a: string, b: string): number {
  // formato ARGB (8 hex chars); compara so os 6 ultimos (RGB)
  const rgbA = a.slice(-6);
  const rgbB = b.slice(-6);
  let dist = 0;
  for (let i = 0; i < 6; i += 2) {
    const va = parseInt(rgbA.slice(i, i + 2), 16);
    const vb = parseInt(rgbB.slice(i, i + 2), 16);
    dist += Math.abs(va - vb);
  }
  return dist;
}

const LIMIAR_COR_IGUAL = 15;

type ColunaMap = {
  codigo: number;
  tipo: number;
  area: number;
  preco: number;
  status: number | null;
};

function encontrarLinhaCabecalho(ws: ExcelJS.Worksheet): number | null {
  for (let r = 1; r <= Math.min(ws.rowCount, 25); r++) {
    const row = ws.getRow(r);
    let achou = false;
    row.eachCell((cell) => {
      if (semEspacos(cell.value).includes("unidad")) achou = true;
    });
    if (achou) return r;
  }
  return null;
}

function mapearColunas(ws: ExcelJS.Worksheet, linhaCabecalho: number): ColunaMap | null {
  const candidatos: Record<string, { col: number; texto: string }[]> = {
    codigo: [],
    status: [],
    tipo: [],
    area: [],
    preco: [],
  };

  const row = ws.getRow(linhaCabecalho);
  row.eachCell((cell, col) => {
    const n = normalizarCabecalho(cell.value);
    if (!n) return;
    if (n.startsWith("UNIDAD") || n.startsWith("#UNIDAD")) candidatos.codigo.push({ col, texto: n });
    if (n === "ESTATUS" || n === "STATUS") candidatos.status.push({ col, texto: n });
    if (n === "TIPO") candidatos.tipo.push({ col, texto: n });
    if (n.includes("M2") && !n.includes("PRECIO") && !n.includes("$")) candidatos.area.push({ col, texto: n });
    if (n.includes("PRECIO") && !n.includes("M2")) candidatos.preco.push({ col, texto: n });
  });

  function escolher(lista: { col: number; texto: string }[]) {
    if (lista.length === 0) return null;
    const comTotal = lista.find((o) => o.texto.includes("TOTAL"));
    return (comTotal ?? lista[0]).col;
  }

  const codigo = escolher(candidatos.codigo);
  const tipo = escolher(candidatos.tipo);
  const area = escolher(candidatos.area);
  const preco = escolher(candidatos.preco);
  const status = escolher(candidatos.status);

  if (!codigo || !tipo || !area || !preco) return null;
  return { codigo, tipo, area, preco, status };
}

function encontrarCorLegenda(ws: ExcelJS.Worksheet, rotulo: "vendido" | "reservado") {
  let cor: string | null = null;
  ws.eachRow((row) => {
    row.eachCell((cell, col) => {
      if (cor) return;
      if (semEspacos(cell.value) === rotulo) {
        const vizinha = row.getCell(col + 1);
        const { argb, temPreenchimento } = corDaCelula(vizinha);
        if (temPreenchimento) cor = argb;
      }
    });
  });
  return cor;
}

function statusPorTexto(valor: unknown): StatusUnidade | null {
  const s = semEspacos(valor);
  if (!s) return null;
  if (s.includes("vendid")) return "VENDIDA";
  if (s.includes("reservad")) return "RESERVADA";
  if (s.includes("livre") || s.includes("disponivel") || s.includes("disponible")) return "DISPONIVEL";
  return null;
}

function derivarAndar(codigo: string): number | null {
  if (!/^\d+$/.test(codigo) || codigo.length < 3) return null;
  return parseInt(codigo.slice(0, -2), 10);
}

export async function importarUnidadesDeArquivo(buffer: Buffer): Promise<ResultadoImportacao> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as never);

  const unidades: UnidadeImportada[] = [];
  const avisos: string[] = [];
  const planilhasComTabela = workbook.worksheets.filter((ws) => encontrarLinhaCabecalho(ws) !== null);
  const precisaPrefixo = planilhasComTabela.length > 1;

  for (const ws of workbook.worksheets) {
    const linhaCabecalho = encontrarLinhaCabecalho(ws);
    if (linhaCabecalho === null) continue;

    const colunas = mapearColunas(ws, linhaCabecalho);
    if (!colunas) {
      avisos.push(`Aba "${ws.name}": não encontrei as colunas de unidade/tipo/área/preço, pulei essa aba.`);
      continue;
    }

    const corVendidoLegenda = encontrarCorLegenda(ws, "vendido");
    const corReservadoLegenda = encontrarCorLegenda(ws, "reservado");

    // Descobre a cor "padrao" (linhas sem status especial) para nao
    // confundir com a cor de "vendido" quando as duas coincidirem.
    const contagemCores = new Map<string, number>();
    for (let r = linhaCabecalho + 1; r <= ws.rowCount; r++) {
      const codigoValor = ws.getRow(r).getCell(colunas.codigo).value;
      if (codigoValor === null || codigoValor === undefined || codigoValor === "") continue;
      const { argb, temPreenchimento } = corDaCelula(ws.getRow(r).getCell(colunas.codigo));
      if (temPreenchimento) {
        contagemCores.set(argb, (contagemCores.get(argb) ?? 0) + 1);
      }
    }
    let corPadrao: string | null = null;
    let maiorContagem = 0;
    for (const [cor, qtd] of contagemCores) {
      if (qtd > maiorContagem) {
        maiorContagem = qtd;
        corPadrao = cor;
      }
    }

    const corVendidoValida =
      corVendidoLegenda && (!corPadrao || distanciaCor(corVendidoLegenda, corPadrao) > LIMIAR_COR_IGUAL)
        ? corVendidoLegenda
        : null;
    const corReservadoValida =
      corReservadoLegenda && (!corPadrao || distanciaCor(corReservadoLegenda, corPadrao) > LIMIAR_COR_IGUAL)
        ? corReservadoLegenda
        : null;

    let linhasVazias = 0;
    for (let r = linhaCabecalho + 1; r <= ws.rowCount; r++) {
      const row = ws.getRow(r);
      const codigoValor = row.getCell(colunas.codigo).value;

      if (codigoValor === null || codigoValor === undefined || codigoValor === "") {
        linhasVazias += 1;
        if (linhasVazias > 5) break;
        continue;
      }
      linhasVazias = 0;

      const codigoBruto =
        typeof codigoValor === "number" ? String(Math.trunc(codigoValor)) : normalizarTexto(codigoValor);
      if (!codigoBruto) continue;

      const tipo = normalizarTexto(row.getCell(colunas.tipo).value);
      const areaTotal = parseNumero(row.getCell(colunas.area).value);
      const preco = parseNumero(row.getCell(colunas.preco).value);

      if (areaTotal === null || preco === null) {
        avisos.push(`Aba "${ws.name}", unidade ${codigoBruto}: área ou preço inválido, pulei essa linha.`);
        continue;
      }

      let status: StatusUnidade = "DISPONIVEL";
      if (colunas.status) {
        status = statusPorTexto(row.getCell(colunas.status).value) ?? "DISPONIVEL";
      } else {
        const { argb, temPreenchimento } = corDaCelula(row.getCell(colunas.codigo));
        if (temPreenchimento) {
          if (corReservadoValida && distanciaCor(argb, corReservadoValida) <= LIMIAR_COR_IGUAL) {
            status = "RESERVADA";
          } else if (corVendidoValida && distanciaCor(argb, corVendidoValida) <= LIMIAR_COR_IGUAL) {
            status = "VENDIDA";
          }
        }
      }

      const codigo = precisaPrefixo ? `${ws.name}-${codigoBruto}` : codigoBruto;

      unidades.push({
        codigo,
        andar: derivarAndar(codigoBruto),
        tipo: tipo || "—",
        areaTotal,
        preco,
        status,
      });
    }
  }

  if (unidades.length === 0) {
    avisos.push("Nenhuma unidade encontrada no arquivo.");
  }

  return { unidades, avisos };
}
