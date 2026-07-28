import { formatBRL, formatPercent } from "../../lib/formatters";

export default function ProductTable({
  produtos,
  search,
  onSearchChange,
  onToggleSortMargin,
  sortByMargin,
  sortDirection,
}) {
  return (
    <section className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Catálogo de produtos</h2>
          <p className="mt-1 text-sm text-slate-400">Busque por nome e ordene a tabela pela margem.</p>
        </div>
        <label className="block max-w-md">
          <span className="sr-only">Buscar produtos</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar produto..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-700 transition focus:border-emerald-400 focus:ring-emerald-400/40 md:w-80"
          />
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800/90 text-slate-400">
              <th className="py-3 pr-4 font-medium">Produto</th>
              <th className="py-3 pr-4 font-medium">Preço</th>
              <th className="py-3 pr-4 font-medium">Custo</th>
              <th className="cursor-pointer py-3 pr-4 font-medium" onClick={onToggleSortMargin}>
                Margem
                <span className="ml-2 text-xs text-slate-500">
                  {sortByMargin ? (sortDirection === "desc" ? "▼" : "▲") : "↕"}
                </span>
              </th>
              <th className="py-3 pr-4 font-medium">Receita</th>
              <th className="py-3 pr-4 font-medium">Lucro</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-b border-slate-800/90 hover:bg-slate-950/80">
                <td className="py-4 pr-4 font-medium text-slate-100">{produto.nome}</td>
                <td className="py-4 pr-4 text-slate-200">{formatBRL(produto.precoNumero)}</td>
                <td className="py-4 pr-4 text-slate-200">
                  {produto.custo === null ? "-" : formatBRL(produto.custo)}
                </td>
                <td className="py-4 pr-4 text-slate-200">{formatPercent(produto.margem)}</td>
                <td className="py-4 pr-4 text-slate-200">{formatBRL(produto.receita)}</td>
                <td className="py-4 pr-4 text-slate-200">
                  {produto.lucro === null ? "-" : formatBRL(produto.lucro)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {produtos.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-950/80 px-4 py-6 text-center text-slate-400">
            Nenhum produto corresponde à busca.
          </div>
        )}
      </div>
    </section>
  );
}
