"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { register } from "@/services/uses-case/auth-service";
import { setToken } from "@/lib/auth-token";
import { getApiErrorMessage } from "@/lib/api-error";
import { PasswordInput } from "@/components/ui/PasswordInput";

export default function RegistroPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { token } = await register(name, email, password);
      setToken(token);
      router.push("/");
    } catch (err) {
      setError(getApiErrorMessage(err, "No se pudo crear la cuenta"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-md mx-auto py-16">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8 flex flex-col gap-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-primary">Crear cuenta</h1>
          <p className="text-sm text-gray-500 mt-1">
            Registrate para poder comprar
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Nombre</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Contraseña</label>
          <PasswordInput
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-gray-400">Mínimo 8 caracteres</p>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-primary hover:bg-secondary transition-colors px-5 py-3 font-bold text-white disabled:opacity-50"
        >
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="text-sm text-center text-gray-500">
          ¿Ya tenés cuenta?{" "}
          <Link href="/ingresar" className="font-semibold text-primary hover:text-secondary">
            Ingresá acá
          </Link>
        </p>
      </form>
    </div>
  );
}
