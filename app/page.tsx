"use client";

import { useState } from "react";

interface ItemVariavel {
  id: number;
  descricao: string;
  valor: string;
}

const novoItem = (id: number): ItemVariavel => ({ id, descricao: "", valor: "" });

export default function Home() {
  const [nomePeca, setNomePeca] = useState("");
  const [precoMetro, setPrecoMetro] = useState("");
  const [metrosUsados, setMetrosUsados] = useState("");
  const [costureira, setCostureira] = useState("");
  const [aviamentos, setAviamentos] = useState<ItemVariavel[]>([novoItem(1)]);
  const [custosExtras, setCustosExtras] = useState<ItemVariavel[]>([novoItem(1)]);
  const [margem, setMargem] = useState("");

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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">FRC</h1>
        <p className="text-gray-500 mt-1">Calculadora de Custo de Roupas</p>
      </div>

      <div className="space-y-6">
        {/* Nome da peça */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">Nome da peça</label>
          <input
            type="text"
            placeholder="Ex: Vestido floral, Calça jeans..."
            value={nomePeca}
            onChange={(e) => setNomePeca(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Tecido */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Tecido</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Preço por metro (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={precoMetro}
                onChange={(e) => setPrecoMetro(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Metros usados</label>
              <input
                type="number"
                placeholder="0"
                value={metrosUsados}
                onChange={(e) => setMetrosUsados(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
          {custoTecido > 0 && (
            <p className="mt-3 text-sm text-indigo-600 font-medium">
              Custo do tecido: {fmt(custoTecido)}
            </p>
          )}
        </div>

        {/* Costureira */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Costureira</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Valor cobrado (R$)</label>
            <input
              type="number"
              placeholder="0,00"
              value={costureira}
              onChange={(e) => setCostureira(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Aviamentos */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Aviamentos</h2>
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
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="number"
                  placeholder="R$"
                  value={item.valor}
                  onChange={(e) =>
                    updateItem(item.id, "valor", e.target.value, aviamentos, setAviamentos)
                  }
                  className="w-28 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            + Adicionar aviamento
          </button>
          {totalAviamentos > 0 && (
            <p className="mt-2 text-sm text-indigo-600 font-medium">
              Total aviamentos: {fmt(totalAviamentos)}
            </p>
          )}
        </div>

        {/* Custos Extras */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Custos Extras</h2>
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
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="number"
                  placeholder="R$"
                  value={item.valor}
                  onChange={(e) =>
                    updateItem(item.id, "valor", e.target.value, custosExtras, setCustosExtras)
                  }
                  className="w-28 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            + Adicionar custo extra
          </button>
          {totalExtras > 0 && (
            <p className="mt-2 text-sm text-indigo-600 font-medium">
              Total extras: {fmt(totalExtras)}
            </p>
          )}
        </div>

        {/* Margem de lucro */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Margem de Lucro</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Ex: 30"
              value={margem}
              onChange={(e) => setMargem(e.target.value)}
              className="w-36 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span className="text-gray-500">%</span>
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
          className="w-full py-3 rounded-2xl border border-gray-200 text-gray-500 hover:bg-gray-100 transition font-medium"
        >
          Limpar tudo
        </button>
      </div>
    </main>
  );
}
