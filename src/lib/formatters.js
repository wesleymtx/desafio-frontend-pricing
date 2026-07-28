const moedaBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatBRL(value) {
  return moedaBRL.format(value);
}

export function formatPercent(value) {
  if (value === null || Number.isNaN(value)) return "-";
  return `${value.toFixed(1).replace(".", ",")} %`;
}
