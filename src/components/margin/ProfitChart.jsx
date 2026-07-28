import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatBRL } from "../../lib/formatters";

export default function ProfitChart({ data }) {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
      <h2 className="text-lg font-semibold text-slate-100">Top 10 produtos por lucro</h2>
      <div className="mt-6 h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="nome"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickFormatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => formatBRL(value)}
              labelFormatter={(label) => `Produto: ${label}`}
              contentStyle={{ backgroundColor: "#0f172a", borderRadius: 12, borderColor: "#334155" }}
            />
            <Bar dataKey="lucro" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
