"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetMe } from "@/services/query-services/auth-query";
import { useDepartamentos, useLocalidades } from "@/services/query-services/geo-query";
import { useUpdateProfile, useChangePassword } from "@/services/mutations-service/auth-mutation";
import { getTokenPayload } from "@/lib/auth-token";
import { getApiErrorMessage } from "@/lib/api-error";
import { PasswordInput } from "@/components/ui/PasswordInput";

export default function MiCuentaPage() {
  const router = useRouter();

  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!getTokenPayload()) {
      router.replace("/ingresar");
      return;
    }

    setCheckedAuth(true);
  }, [router]);

  const { data: me, isLoading: isLoadingMe } = useGetMe();
  const { data: departamentos = [], isLoading: isLoadingDepartamentos } = useDepartamentos();

  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [profileError, setProfileError] = useState("");

  const { data: localidades = [], isLoading: isLoadingLocalidades } = useLocalidades(department);

  useEffect(() => {
    if (!me) return;

    setFirstName(me.firstName ?? "");
    setLastName(me.lastName ?? "");
    setPhone(me.phone ?? "");
    setDepartment(me.department ?? "");
    setLocation(me.location ?? "");
  }, [me]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
    setLocation("");
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");

    try {
      await updateProfile.mutateAsync({ firstName, lastName, phone, department, location });
    } catch (err) {
      setProfileError(getApiErrorMessage(err, "No se pudieron guardar los cambios"));
    }
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    try {
      await changePassword.mutateAsync({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setPasswordError(getApiErrorMessage(err, "No se pudo cambiar la contraseña"));
    }
  };

  if (!checkedAuth || isLoadingMe) return null;

  return (
    <div className="w-[90%] max-w-2xl mx-auto py-16 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Mi cuenta</h1>
        <p className="text-sm text-gray-500 mt-1">Gestioná tus datos personales</p>
      </div>

      {/* DATOS PERSONALES */}
      <form
        onSubmit={handleProfileSubmit}
        className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8 flex flex-col gap-6"
      >
        <h2 className="font-bold text-lg">Datos personales</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Nombre</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Apellido</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <input
            type="email"
            disabled
            value={me?.email ?? ""}
            className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-400">El email no se puede modificar</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Celular</label>
          <input
            type="tel"
            required
            placeholder="Ej: 261 555-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Departamento</label>
            <select
              required
              value={department}
              onChange={handleDepartmentChange}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary bg-white"
            >
              <option value="">
                {isLoadingDepartamentos ? "Cargando..." : "Seleccionar"}
              </option>
              {departamentos.map((dep) => (
                <option key={dep.id} value={dep.nombre}>
                  {dep.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Localidad</label>
            <select
              required
              disabled={!department}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary bg-white disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="">
                {!department
                  ? "Elegí un departamento"
                  : isLoadingLocalidades
                  ? "Cargando..."
                  : "Seleccionar"}
              </option>
              {localidades.map((loc) => (
                <option key={loc.id} value={loc.nombre}>
                  {loc.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {profileError && (
          <p className="text-sm text-red-500 text-center">{profileError}</p>
        )}

        <button
          type="submit"
          disabled={updateProfile.isPending}
          className="rounded-xl bg-primary hover:bg-secondary transition-colors px-5 py-3 font-bold text-white disabled:opacity-50 self-start"
        >
          {updateProfile.isPending ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>

      {/* CAMBIAR CONTRASEÑA */}
      <form
        onSubmit={handlePasswordSubmit}
        className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8 flex flex-col gap-6"
      >
        <h2 className="font-bold text-lg">Cambiar contraseña</h2>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Contraseña actual</label>
          <PasswordInput
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Nueva contraseña</label>
          <PasswordInput
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="text-xs text-gray-400">Mínimo 8 caracteres</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Confirmar nueva contraseña</label>
          <PasswordInput
            required
            minLength={8}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        {passwordError && (
          <p className="text-sm text-red-500 text-center">{passwordError}</p>
        )}

        <button
          type="submit"
          disabled={changePassword.isPending}
          className="rounded-xl bg-primary hover:bg-secondary transition-colors px-5 py-3 font-bold text-white disabled:opacity-50 self-start"
        >
          {changePassword.isPending ? "Actualizando..." : "Cambiar contraseña"}
        </button>
      </form>
    </div>
  );
}
