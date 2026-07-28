# Desafio Técnico Frontend — Painel de Margem do Catálogo

Este repositório implementa o painel de margem do catálogo solicitado pela Volix.

## Setup

```bash
npm install
npm run dev    # abre em http://localhost:3000
npm test       # roda a suíte de validação
npm run build  # valida o build Next.js
```

## O que foi implementado

- Painel de resumo com receita total, lucro total e margem consolidada do catálogo.
- Tabela do catálogo com busca por nome e ordenação por margem.
- Gráfico de barras com os 10 produtos de maior lucro mensal.
- Tratamento de dados sujos do ERP:
  - `preco` pode ser número ou string pt-BR;
  - `custo` pode ser `null`;
  - `preco` pode ser `0`.
- Margem consolidada calculada como `totalLucro / totalReceita × 100`, representando a rentabilidade real do portfólio.

## Estrutura atual

- `src/app/page.jsx` — ponto de entrada que renderiza o dashboard.
- `src/components/margin/MarginDashboard.jsx` — orquestração da tela e estados de busca/ordenação.
- `src/components/margin/MarginSummary.jsx` — apresentação dos valores consolidados.
- `src/components/margin/ProductTable.jsx` — tabela de produtos com busca e ordenação.
- `src/components/margin/ProfitChart.jsx` — gráfico de top 10 lucros.
- `src/lib/pricing.js` — regras de negócio e cálculos puros.
- `src/lib/formatters.js` — formatação de moeda e percentual.
- `src/data/catalago.json` — dados do catálogo exportados do ERP.

## Tecnologias

- Next.js
- React
- Tailwind CSS
- Recharts
- Vitest

## Como funciona

- `src/lib/pricing.js` normaliza preços e calcula receita, lucro e margem por produto.
- Produtos são carregados de `src/data/catalago.json` e transformados antes de chegar aos componentes.
- A tabela recebe produtos já preparados e apenas apresenta os dados.
- O gráfico recebe os 10 produtos de maior lucro pré-filtrados.

## Observações

- O painel prioriza clareza e correção dos números.
- Os componentes seguem a separação de responsabilidades entre domínio, apresentação e estado.

## Entrega

Encaminhe o link do fork público para alice.ramalho@volix.com.br.
