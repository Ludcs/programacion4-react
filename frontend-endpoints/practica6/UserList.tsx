import { useEffect, useState } from "react";
import type { FormEvent } from "react";

interface User {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

interface UserDetail {
  id: number;
  name: string;
  age: number;
  email: string;
  country: Country;
  roles: Role[];
}

export default function UserList({ token }: { token: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onlyAdults, setOnlyAdults] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryId, setCountryId] = useState("1");
  const [formMessage, setFormMessage] = useState<string | null>(null);

  function fetchUsers(query?: string, adults = onlyAdults) {
    setLoading(true);
    setError(null);

    const url = adults
      ? `${import.meta.env.VITE_API_URL}/user_mayores`
      : query
        ? `${import.meta.env.VITE_API_URL}/user/search/${encodeURIComponent(query)}`
        : `${import.meta.env.VITE_API_URL}/user`;

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (respuesta) => {
        const data = await respuesta.json();
        if (!respuesta.ok) {
          setError(data.detail);
          return;
        }
        setUsers(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (selectedUserId === null) return;

    fetch(`${import.meta.env.VITE_API_URL}/user/${selectedUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (respuesta) => {
      const data = await respuesta.json();
      if (!respuesta.ok) {
        setError(data.detail);
        return;
      }
      setSelectedUser(data);
    });
  }, [selectedUserId, token]);

  function handleSearch() {
    if (!search.trim()) return;
    setOnlyAdults(false);
    fetchUsers(search.trim(), false);
  }

  function handleClear() {
    setSearch("");
    setOnlyAdults(false);
    fetchUsers(undefined, false);
  }

  function handleToggleAdults() {
    const nextValue = !onlyAdults;
    setOnlyAdults(nextValue);
    fetchUsers(undefined, nextValue);
  }

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    setFormMessage(null);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        age: Number(age),
        email,
        password,
        country_id: Number(countryId),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setFormMessage(data.detail || "ERROR AL CREAR USUARIO");
      return;
    }

    setFormMessage(data.message || `USUARIO ${data.name ?? name} CREADO`);
    setName("");
    setAge("");
    setEmail("");
    setPassword("");
    fetchUsers();
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="border border-gray-300 px-3 py-1 rounded cursor-pointer"
        >
          Limpiar
        </button>
        <button
          type="button"
          onClick={handleToggleAdults}
          className="border border-gray-300 px-3 py-1 rounded cursor-pointer"
        >
          {onlyAdults ? "Todos" : "Solo mayores"}
        </button>
      </div>

      <div className="flex gap-8">
        <ul className="space-y-1">
          {users.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                onClick={() => setSelectedUserId(user.id)}
                className="underline cursor-pointer"
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>

        {selectedUser && (
          <div className="space-y-1">
            <p className="font-bold">
              Hola {selectedUser.name} (
              {selectedUser.roles.map((r) => r.name).join(", ") || "Sin rol"}),
              estos son tus datos
            </p>
            <p>Email: {selectedUser.email}</p>
            <p>Edad: {selectedUser.age}</p>
            <p>País: {selectedUser.country.name}</p>
            <p>Roles: {selectedUser.roles.map((r) => r.name).join(", ")}</p>
          </div>
        )}
      </div>
      <form onSubmit={handleCreateUser} className="space-y-2 border-t pt-4">
        <p className="font-bold">NUEVO USUARIO</p>
        <input
          type="text"
          placeholder="NOMBRE"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-1 block"
        />
        <input
          type="number"
          placeholder="EDAD"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-1 block"
        />
        <input
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-1 block"
        />
        <input
          type="password"
          placeholder="CONTRASEÑA"
          minLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-1 block"
        />
        <select
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 block"
        >
          <option value="1">ARGENTINA</option>
          <option value="2">BRASIL</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          CREAR
        </button>
        {formMessage && <p>{formMessage}</p>}
      </form>
    </div>
  );
}