/**
 * Interpreta o valor de preço bruto vindo do ERP.
 * Pode ser number ou string em formato pt-BR.
 *
 * @param {number|string} valor
 * @returns {number}
 */
export function parsePreco(valor) {
  if (typeof valor === "number") {
    return valor;
  }

  if (typeof valor === "string") {
    const normalizado = valor.replace(/\./g, "").replace(/,/g, ".");
    return Number(normalizado);
  }

  return Number(valor);
}

/**
 * Calcula os indicadores de um produto.
 *
 * @param {{ preco: number|string, custo: number|null, demanda: number }} produto
 * @returns {{ receita: number, lucro: number|null, margem: number|null }}
 */
export function calcularProduto(produto) {
  const preco = parsePreco(produto.preco);
  const receita = preco * produto.demanda;

  if (produto.custo === null || preco === null || Number.isNaN(preco)) {
    return {
      receita,
      lucro: null,
      margem: null,
    };
  }

  const lucro = (preco - produto.custo) * produto.demanda;
  const margem = preco > 0 ? ((preco - produto.custo) / preco) * 100 : null;

  return {
    receita,
    lucro,
    margem,
  };
}

export function calcularTotaisCatalogo(produtos) {
  const receita = produtos.reduce((sum, produto) => sum + produto.receita, 0);
  const lucro = produtos.reduce((sum, produto) => sum + (produto.lucro ?? 0), 0);
  const margemConsolidada = receita > 0 ? (lucro / receita) * 100 : 0;

  return {
    receita,
    lucro,
    margemConsolidada,
  };
}

export function obterTop10Lucro(produtos) {
  return [...produtos]
    .filter((produto) => produto.lucro !== null)
    .sort((a, b) => b.lucro - a.lucro)
    .slice(0, 10)
    .map((produto) => ({
      nome: produto.nome,
      lucro: Number(produto.lucro.toFixed(2)),
    }));
}
