"use client";

import { useState, useEffect } from "react";

interface ItemVariavel {
  id: number;
  descricao: string;
  valor: string;
}

const novoItem = (id: number): ItemVariavel => ({ id, descricao: "", valor: "" });

const inputCls =
  "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400";

const cardCls =
  "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 dark:bg-gray-800 dark:border-gray-700";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [nomePeca, setNomePeca] = useState("");
  const [precoMetro, setPrecoMetro] = useState("");
  const [metrosUsados, setMetrosUsados] = useState("");
  const [costureira, setCostureira] = useState("");
  const [aviamentos, setAviamentos] = useState<ItemVariavel[]>([novoItem(1)]);
  const [custosExtras, setCustosExtras] = useState<ItemVariavel[]>([novoItem(1)]);
  const [margem, setMargem] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("frc-theme");
    const prefersDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("frc-theme", next ? "dark" : "light");
  };

  const parseNum = (v: string) => parseFloat(v.replace(",", ".")) || 0;

  const custoTecido = parseNum(precoMetro) * parseNum(metrosUsados);
  const custoCostureira = parseNum(costureira);
  const totalAviamentos = aviamentos.reduce((s, i) => s + parseNum(i.valor), 0);
  const totalExtras = custosExtras.reduce((s, i) => s + parseNum(i.valor), 0);
  const custoTotal = custoTecido + custoCostureira + totalAviamentos + totalExtras;
  const precoVenda = margem ? custoTotal * (1 + parseNum(margem) / 100) : null;

  const addItem = (
    list: ItemVariavel[],
    setList: React.Dispatch<React.SetStateAction<ItemVariavel[]>>
  ) => setList([...list, novoItem(Date.now())]);

  const removeItem = (
    id: number,
    list: ItemVariavel[],
    setList: React.Dispatch<React.SetStateAction<ItemVariavel[]>>
  ) => setList(list.filter((i) => i.id !== id));

  const updateItem = (
    id: number,
    field: keyof Omit<ItemVariavel, "id">,
    value: string,
    list: ItemVariavel[],
    setList: React.Dispatch<React.SetStateAction<ItemVariavel[]>>
  ) => setList(list.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const limpar = () => {
    setNomePeca("");
    setPrecoMetro("");
    setMetrosUsados("");
    setCostureira("");
    setAviamentos([novoItem(1)]);
    setCustosExtras([novoItem(1)]);
    setMargem("");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">FRC</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Calculadora de Custo de Roupas</p>
        </div>
        <button
          onClick={toggleDark}
          className="mt-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Alternar modo noturno"
        >
          {dark ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
              </svg>
              Claro
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-12.37-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0zM7.05 18.36l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0z" />
              </svg>
              Escuro
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Nome da peça */}
        <div className={cardCls}>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Nome da peça</label>
          <input
            type="text"
            placeholder="Ex: Vestido floral, Calça jeans..."
            value={nomePeca}
            onChange={(e) => setNomePeca(e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Tecido */}
        <div className={cardCls}>
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">Tecido</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Preço por metro (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={precoMetro}
                onChange={(e) => setPrecoMetro(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Metros usados</label>
              <input
                type="number"
                placeholder="0"
                value={metrosUsados}
                onChange={(e) => setMetrosUsados(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
          {custoTecido > 0 && (
            <p className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Custo do tecido: {fmt(custoTecido)}
            </p>
          )}
        </div>

        {/* Costureira */}
        <div className={cardCls}>
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">Costureira</h2>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Valor cobrado (R$)</label>
            <input
              type="number"
              placeholder="0,00"
              value={costureira}
              onChange={(e) => setCostureira(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Aviamentos */}
        <div className={cardCls}>
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">Aviamentos</h2>
          <div className="space-y-3">
            {aviamentos.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Ex: Botão, Zíper..."
                  value={item.descricao}
                  onChange={(e) =>
                    updateItem(item.id, "descricao", e.target.value, aviamentos, setAviamentos)
                  }
                  className={inputCls + " flex-1"}
                />
                <input
                  type="number"
                  placeholder="R$"
                  value={item.valor}
                  onChange={(e) =>
                    updateItem(item.id, "valor", e.target.value, aviamentos, setAviamentos)
                  }
                  className={inputCls + " !w-28"}
                />
                {aviamentos.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id, aviamentos, setAviamentos)}
                    className="text-red-400 hover:text-red-600 text-xl font-bold leading-none"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => addItem(aviamentos, setAviamentos)}
            className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          >
            + Adicionar aviamento
          </button>
          {totalAviamentos > 0 && (
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Total aviamentos: {fmt(totalAviamentos)}
            </p>
          )}
        </div>

        {/* Custos Extras */}
        <div className={cardCls}>
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">Custos Extras</h2>
          <div className="space-y-3">
            {custosExtras.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Ex: Gasolina, Embalagem..."
                  value={item.descricao}
                  onChange={(e) =>
                    updateItem(item.id, "descricao", e.target.value, custosExtras, setCustosExtras)
                  }
                  className={inputCls + " flex-1"}
                />
                <input
                  type="number"
                  placeholder="R$"
                  value={item.valor}
                  onChange={(e) =>
                    updateItem(item.id, "valor", e.target.value, custosExtras, setCustosExtras)
                  }
                  className={inputCls + " !w-28"}
                />
                {custosExtras.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id, custosExtras, setCustosExtras)}
                    className="text-red-400 hover:text-red-600 text-xl font-bold leading-none"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => addItem(custosExtras, setCustosExtras)}
            className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          >
            + Adicionar custo extra
          </button>
          {totalExtras > 0 && (
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Total extras: {fmt(totalExtras)}
            </p>
          )}
        </div>

        {/* Margem de lucro */}
        <div className={cardCls}>
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">Margem de Lucro</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Ex: 30"
              value={margem}
              onChange={(e) => setMargem(e.target.value)}
              className={inputCls + " !w-36"}
            />
            <span className="text-gray-500 dark:text-gray-400">%</span>
          </div>
        </div>

        {/* Resultado */}
        {custoTotal > 0 && (
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-md">
            {nomePeca && (
              <p className="text-indigo-200 text-sm mb-1">{nomePeca}</p>
            )}
            <div className="space-y-2 mb-4 text-sm text-indigo-100">
              {custoTecido > 0 && <div className="flex justify-between"><span>Tecido</span><span>{fmt(custoTecido)}</span></div>}
              {custoCostureira > 0 && <div className="flex justify-between"><span>Costureira</span><span>{fmt(custoCostureira)}</span></div>}
              {totalAviamentos > 0 && <div className="flex justify-between"><span>Aviamentos</span><span>{fmt(totalAviamentos)}</span></div>}
              {totalExtras > 0 && <div className="flex justify-between"><span>Extras</span><span>{fmt(totalExtras)}</span></div>}
            </div>
            <div className="border-t border-indigo-400 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Custo total</span>
                <span className="font-bold text-2xl">{fmt(custoTotal)}</span>
              </div>
              {precoVenda !== null && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-indigo-200">Preço de venda ({margem}%)</span>
                  <span className="font-bold text-2xl text-yellow-300">{fmt(precoVenda)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Limpar */}
        <button
          onClick={limpar}
          className="w-full py-3 rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-100 transition font-medium dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Limpar tudo
        </button>
      </div>
    </main>
  );
}
