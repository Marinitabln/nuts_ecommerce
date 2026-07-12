"use client";

import { useState } from "react";
import { Search, ShieldCheck, UserPlus, Users } from "lucide-react";

import { KpiCard } from "@/components/dashboard/KpiCard";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  createdAt: string;
}

const MOCK_USERS: MockUser[] = [
  { id: "1", name: "Lucía Fernández", email: "lucia.fernandez@mail.com", role: "customer", createdAt: "01/07/2026" },
  { id: "2", name: "Martín Sosa", email: "martin.sosa@mail.com", role: "customer", createdAt: "28/06/2026" },
  { id: "3", name: "Rocío Medina", email: "rocio.medina@mail.com", role: "customer", createdAt: "22/06/2026" },
  { id: "4", name: "Franco Díaz", email: "franco.diaz@mail.com", role: "customer", createdAt: "15/06/2026" },
  { id: "5", name: "Agustina Torres", email: "agustina.torres@mail.com", role: "customer", createdAt: "10/06/2026" },
  { id: "6", name: "Bruno Acosta", email: "bruno.acosta@mail.com", role: "admin", createdAt: "05/05/2026" },
];

export default function UsuariosPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const admins = MOCK_USERS.filter((user) => user.role === "admin").length;
  const customers = MOCK_USERS.length - admins;

  return (
    <section className="w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Usuarios</h1>
        <p className="text-gray-500 mt-1">Clientes y administradores de la tienda</p>
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-primary">
        Datos de ejemplo — todavía no está conectado a la lista real de usuarios de Firestore.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Total de usuarios"
          metric={{ value: MOCK_USERS.length, changePercent: 6, trend: "up" }}
          color="primary"
          icon={<Users />}
        />
        <KpiCard
          title="Administradores"
          metric={{ value: admins, changePercent: 0, trend: "stable" }}
          color="secondary"
          icon={<ShieldCheck />}
        />
        <KpiCard
          title="Clientes"
          metric={{ value: customers, changePercent: 6, trend: "up" }}
          color="success"
          icon={<UserPlus />}
        />
      </div>

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-primary"
        />
      </div>

      <div className="w-full overflow-x-auto rounded-2xl p-4 bg-white shadow-sm">
        <table className="w-full min-w-[600px]">
          <thead className="border-b border-primary">
            <tr className="text-left">
              <th className="p-3 font-semibold">Nombre</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Rol</th>
              <th className="p-3 font-semibold hidden md:table-cell">Alta</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-500">
                  No se encontraron usuarios
                </td>
              </tr>
            )}

            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-secondary hover:bg-secondary/20 transition-colors"
              >
                <td className="p-3 font-semibold">{user.name}</td>
                <td className="p-3 text-gray-500">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      user.role === "admin"
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.role === "admin" ? "Administrador" : "Cliente"}
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell text-gray-500">{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
