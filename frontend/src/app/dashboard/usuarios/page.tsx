"use client";

import { useState } from "react";
import { Search, ShieldCheck, UserPlus, Users } from "lucide-react";

import { KpiCard } from "@/components/dashboard/KpiCard";
import { useGetUsers } from "@/services/query-services/users-query";
import { useUpdateUserRole, useDeleteUser } from "@/services/mutations-service/users-mutation";
import { getTokenPayload } from "@/lib/auth-token";
import { getApiErrorMessage } from "@/lib/api-error";

export default function UsuariosPage() {
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useGetUsers();
  const updateRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();

  const currentEmail = getTokenPayload()?.email;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const admins = users.filter((user) => user.role === "admin").length;
  const customers = users.length - admins;

  const handleRoleChange = (id: string, role: "admin" | "customer") => {
    updateRole.mutate(
      { id, role },
      {
        onError: (err) => {
          alert(getApiErrorMessage(err, "No se pudo cambiar el rol"));
        },
      }
    );
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`¿Seguro que querés eliminar a "${name}"?`)) return;

    deleteUser.mutate(id, {
      onError: (err) => {
        alert(getApiErrorMessage(err, "No se pudo eliminar el usuario"));
      },
    });
  };

  return (
    <section className="w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Usuarios</h1>
        <p className="text-gray-500 mt-1">Clientes y administradores de la tienda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Total de usuarios"
          metric={{ value: users.length, changePercent: 0, trend: "stable" }}
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
          metric={{ value: customers, changePercent: 0, trend: "stable" }}
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
        <table className="w-full min-w-[700px]">
          <thead className="border-b border-primary">
            <tr className="text-left">
              <th className="p-3 font-semibold">Nombre</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold hidden md:table-cell">Teléfono</th>
              <th className="p-3 font-semibold">Rol</th>
              <th className="p-3 font-semibold hidden md:table-cell">Alta</th>
              <th className="p-3 font-semibold text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500">
                  Cargando usuarios...
                </td>
              </tr>
            )}

            {!isLoading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500">
                  No se encontraron usuarios
                </td>
              </tr>
            )}

            {!isLoading &&
              filteredUsers.map((user) => {
                const isSelf = user.email === currentEmail;

                return (
                  <tr
                    key={user.id}
                    className="border-b border-secondary hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-3 font-semibold">
                      {user.name}
                      {isSelf && <span className="text-xs text-gray-400"> (vos)</span>}
                    </td>
                    <td className="p-3 text-gray-500">{user.email}</td>
                    <td className="p-3 hidden md:table-cell text-gray-500">
                      {user.phone || "-"}
                    </td>
                    <td className="p-3">
                      <select
                        value={user.role}
                        disabled={isSelf || updateRole.isPending}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value as "admin" | "customer")
                        }
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize border-none outline-none disabled:opacity-60 ${
                          user.role === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <option value="admin">Administrador</option>
                        <option value="customer">Cliente</option>
                      </select>
                    </td>
                    <td className="p-3 hidden md:table-cell text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("es-AR")
                        : "-"}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        disabled={isSelf || deleteUser.isPending}
                        className="text-sm font-medium text-error hover:underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
