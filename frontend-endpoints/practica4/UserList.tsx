import { useEffect, useState } from "react";

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

    function fetchUsers(query?: string) {
    setLoading(true);
    setError(null);

    const url = query
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
    fetchUsers(search.trim());
  }

  function handleClear() {
    setSearch("");
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
              Hola {selectedUser.name} ({selectedUser.roles.map((r) => r.name).join(", ") || "Sin rol"}), estos son tus datos
            </p>
            <p>Email: {selectedUser.email}</p>
            <p>Edad: {selectedUser.age}</p>
            <p>País: {selectedUser.country.name}</p>
            <p>Roles: {selectedUser.roles.map((r) => r.name).join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
