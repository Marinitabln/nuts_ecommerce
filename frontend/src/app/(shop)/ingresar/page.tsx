"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { login } from "@/services/uses-case/auth-service";
import { setToken } from "@/lib/auth-token";
import { getApiErrorMessage } from "@/lib/api-error";

export default function IngresarPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { token } = await login(email, password);
      setToken(token);
      router.push("/");
    } catch (err) {
      setError(getApiErrorMessage(err, "Email o contraseña incorrectos"));
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
          <h1 className="text-2xl font-bold text-primary">Ingresar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Accedé a tu cuenta para comprar
          </p>
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
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-primary hover:bg-secondary transition-colors px-5 py-3 font-bold text-white disabled:opacity-50"
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="text-sm text-center text-gray-500">
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="font-semibold text-primary hover:text-secondary">
            Creá una acá
          </Link>
        </p>
      </form>
    </div>
  );
}
