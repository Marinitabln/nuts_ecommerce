"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { login } from "@/services/uses-case/auth-service";
import { setToken } from "@/lib/auth-token";
import { getApiErrorMessage } from "@/lib/api-error";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
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
      router.push("/dashboard");
    } catch (err) {
      setError(getApiErrorMessage(err, "Credenciales inválidas"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2">
          <Image src="/nuts_logo.svg" alt="Nuts" height={56} width={56} />
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
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

        <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
          Ingresar
        </Button>
      </form>
    </div>
  );
}
