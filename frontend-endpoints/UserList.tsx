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
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
//   const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (respuesta) => {
      const data = await respuesta.json();
      if (!respuesta.ok) {
        setError(data.detail); // 401, 403…: viene un objeto { detail }
        return;
      }
      setUsers(data); // 200: recién acá es una lista
    });
  }, [token]);

  useEffect(() => {
    if (selectedUserId === null) return;

    fetch(`${import.meta.env.VITE_API_URL}/user/${selectedUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (respuesta) => {
        const data = await respuesta.json();
        if (!respuesta.ok) {
          setError(data.detail);
          return;
        }
        setSelectedUser(data);
      })
  }, [selectedUserId, token]);

  if (error) return <p>{error}</p>;

  return (
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
          <p>Email: {selectedUser.email}</p>
          <p>Edad: {selectedUser.age}</p>
          <p>País: {selectedUser.country.name}</p>
          <p>Roles: {selectedUser.roles.map((r) => r.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
}
