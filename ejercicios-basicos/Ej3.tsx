import { useState } from "react";

export default function MostrarYOcultar() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="flex flex-col justify-center items-start gap-2 border border-solid border-gray-300 rounded-lg p-4 max-w-2xl">
      <h1>¿Qué es JSX?</h1>
      <button
        type="button"
        className="cursor-pointer rounded-lg border border-blue-400 bg-cyan-300 px-4 py-2 text-sm font-medium text-cyan-950 hover:bg-cyan-400"
        onClick={() => setMostrar(!mostrar)}
      >
        {mostrar ? "Ocultar respuesta" : "Mostrar respuesta"}
      </button>
      {mostrar && (
        <p className="text-gray-500">
          Una sintaxis que permite escribir estructura parecida a HTML dentro de
          Javascript. Se transforma en llamadas a funciones de React.
        </p>
      )}
    </div>
  );
}
