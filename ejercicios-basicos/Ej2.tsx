import { useState } from "react"

export default function Contador() {

    const [valor, setValor] = useState(0)

    const incrementar = () => {
        if (valor < 10)
        setValor(valor + 1)
    }

    const decrementar = () => {

        setValor(valor - 1)
    }

    return (
        <div className="flex flex-col gap-2 border border-solid border-gray-300 rounded-lg p-4 w-fit">
            <p className="text-2xl font-bold">{valor}</p>
            <div className="flex gap-2">
                <button className={`${valor === 0 ? 'bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed' : 'bg-gray-300 text-gray-500 py-2 px-4 rounded hover:bg-gray-400 cursor-pointer'}`} onClick={decrementar} disabled={valor === 0}>
                    -
                </button>
                <button className={`${valor === 10 ? 'bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed' : 'bg-gray-300 text-gray-500 py-2 px-4 rounded hover:bg-gray-400 cursor-pointer'}`} onClick={incrementar} disabled={valor === 10}>
                    +
                </button>
                <button onClick={() => setValor(0)} className="bg-gray-300 text-gray-500 py-2 px-4 rounded hover:bg-gray-400 cursor-pointer">
                    Reiniciar
                </button>                
            </div>
            {valor === 10 && <p className="text-sm text-gray-500">Llegaste al máximo</p>}
        </div>
    )
}