import { formatBRL, formatPercent } from "../../lib/formatters";

export default function MarginSummary({ totais }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <article className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Receita total</p>
        <p className="mt-4 text-3xl font-semibold text-emerald-300">{formatBRL(totais.receita)}</p>
      </article>
      <article className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Lucro total</p>
        <p className="mt-4 text-3xl font-semibold text-sky-300">{formatBRL(totais.lucro)}</p>
      </article>
      <article className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Margem consolidada</p>
        <p className="mt-4 text-3xl font-semibold text-violet-300">{formatPercent(totais.margemConsolidada)}</p>
      </article>
    </div>
  );
}
