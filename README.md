<div align="center">
  <h1>FRC — Formulário de Registro de Custos</h1>
  <p>Calculadora de custo de produção e preço de venda para confecções</p>

  <a href="https://frc-trabalho.vercel.app">
    <img src="https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge" alt="Live Demo" />
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</div>

---

## O que é

**FRC** é uma ferramenta web para costureiras e confecções calcularem o **custo total de produção** de uma peça e o **preço de venda sugerido** com margem de lucro configurável — tudo no browser, sem backend ou cadastro.

## Funcionalidades

- **Tecido** — preço por metro × metros utilizados
- **Mão de obra** — custo da costureira por peça
- **Aviamentos** — lista dinâmica (adicionar/remover: linha, botão, zíper etc.)
- **Custos extras** — lista dinâmica para despesas adicionais
- **Margem de lucro** — percentual configurável
- **Resumo em tempo real** — custo total e preço de venda calculados automaticamente em BRL
- **Modo escuro** — preferência persistida no `localStorage`
- **Limpar tudo** — reseta todos os campos com um clique

## Stack

| Tech | Versão |
|------|--------|
| Next.js (App Router) | 16 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 3.4 |

Sem banco de dados · Sem autenticação · 100% client-side

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy

Hospedado na Vercel: **[frc-trabalho.vercel.app](https://frc-trabalho.vercel.app)**
