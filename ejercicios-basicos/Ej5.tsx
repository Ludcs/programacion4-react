import { useState } from "react";

interface Item {
  id: number;
  texto: string;
}

export default function ListaCompras() {
  const [texto, setTexto] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  const agregarItem = () => {
    if (!texto.trim()) return;

    const nuevo: Item = {
      id: Date.now(),
      texto: texto.trim(),
    };

    setItems([...items, nuevo]);
    setTexto("");
  };

  const eliminarItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ej: yerba"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 outline-0"
        />
        <button
          onClick={agregarItem}
          className="border border-cyan-600 bg-cyan-50 text-cyan-900 px-3 py-1 rounded"
        >
          Agregar
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No hay nada para comprar</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <span className="mr-2">{item.texto}</span>
              <button
                onClick={() => eliminarItem(item.id)}
                className="border border-cyan-600 bg-cyan-50 text-cyan-900 px-2 py-0.5 rounded text-sm"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
