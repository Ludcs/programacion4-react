import { useState } from "react";

const LENGUAJES: string[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Rust",
  "PHP",
];

export default function Buscador() {
  const [busqueda, setBusqueda] = useState<string>("");

  const filtrados = LENGUAJES.filter((lenguaje) =>
    lenguaje.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Buscar lenguaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border rounded px-3 py-1.5"
      />

      <p className="text-sm text-gray-600">
        {filtrados.length} {filtrados.length === 1 ? "resultado" : "resultados"}
      </p>

      <ul className="list-disc pl-5 space-y-1">
        {filtrados.map((lenguaje) => (
          <li key={lenguaje}>{lenguaje}</li>
        ))}
      </ul>
    </div>
  );
}
