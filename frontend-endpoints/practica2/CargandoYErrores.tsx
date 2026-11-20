import { useState } from "react";
import type { SubmitEvent } from "react";
import UserList from "./UserList";

export default function CargandoYErrores() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleSubmit(evento: SubmitEvent) {
    evento?.preventDefault();
    setError(null);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.detail);
      return;
    }

    setToken(data.token);
  }

  if (token) {
    return <UserList token={token} />;
  }

  return (
    <>
      {!token && (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            className="border border-gray-300 rounded px-3 py-1 outline-0"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded px-3 py-1 outline-0"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            type="submit"
          >
            Ingresar
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </>
  );
}
