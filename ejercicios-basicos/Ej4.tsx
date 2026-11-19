import { useState } from "react";

export default function ConversorTemperatura() {
    const [celsius, setCelsius] = useState<string>("");

    const valor = Number(celsius);
    const fahrenheit = valor * 9 / 5 + 32;

    return (
        <div>
            <input className="border border-gray-300 rounded-md p-2 mb-2 outline-0" type="text" value={celsius} onChange={(e) => setCelsius(e.target.value)} />
            <h1 className="text-3xl font-bold">{fahrenheit.toFixed(1)} °F</h1>
            {valor > 30 && <p className="font-semibold">Hace calor</p>}
        </div>
    )
}