"use client";

import { useMemo, useState } from "react";
import catalogo from "../../data/catalago.json";
import {
  calcularProduto,
  calcularTotaisCatalogo,
  obterTop10Lucro,
  parsePreco,
} from "../../lib/pricing";
import MarginSummary from "./MarginSummary";
import ProfitChart from "./ProfitChart";
import ProductTable from "./ProductTable";

export default function MarginDashboard() {
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortByMargin, setSortByMargin] = useState(false);

  const produtos = useMemo(
    () =>
      catalogo.map((produto) => ({
        ...produto,
        precoNumero: parsePreco(produto.preco),
        ...calcularProduto(produto),
      })),
    []
  );

  const produtosFiltrados = useMemo(() => {
    const filtro = search.trim().toLowerCase();
    return [...produtos]
      .filter((produto) => produto.nome.toLowerCase().includes(filtro))
      .sort((a, b) => {
        if (!sortByMargin) return 0;
        const margemA = a.margem ?? -Infinity;
        const margemB = b.margem ?? -Infinity;
        return sortDirection === "asc"
          ? margemA - margemB
          : margemB - margemA;
      });
  }, [produtos, search, sortByMargin, sortDirection]);

  const totais = useMemo(() => calcularTotaisCatalogo(produtos), [produtos]);

  const top10Lucro = useMemo(() => obterTop10Lucro(produtos), [produtos]);

  const toggleSortMargin = () => {
    if (!sortByMargin) {
      setSortByMargin(true);
      setSortDirection("desc");
      return;
    }

    setSortDirection((currentDirection) =>
      currentDirection === "desc" ? "asc" : "desc"
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-3 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
            Desafio Técnico · Volix
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-slate-50">Painel de Margem do Catálogo</h1>
            <p className="max-w-2xl text-slate-400">
              Visualize receita, lucro e margem do portfólio com busca, ordenação e gráfico de top 10 lucros.
            </p>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <MarginSummary totais={totais} />
          <ProfitChart data={top10Lucro} />
        </section>

        <ProductTable
          produtos={produtosFiltrados}
          search={search}
          onSearchChange={(value) => setSearch(value)}
          onToggleSortMargin={toggleSortMargin}
          sortByMargin={sortByMargin}
          sortDirection={sortDirection}
        />
      </div>
    </main>
  );
}
