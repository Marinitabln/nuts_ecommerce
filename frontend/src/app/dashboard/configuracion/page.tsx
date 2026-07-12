"use client";

import { Bell, Building2, ShieldCheck } from "lucide-react";

export default function ConfiguracionPage() {
  return (
    <section className="w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Configuración</h1>
        <p className="text-gray-500 mt-1">Preferencias generales de la tienda</p>
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-primary">
        Vista previa — estas secciones todavía no guardan cambios reales.
      </div>

      {/* DATOS DEL NEGOCIO */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Building2 size={20} />
          </div>
          <h2 className="font-bold text-lg">Datos del negocio</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nombre de la tienda</label>
            <input
              disabled
              defaultValue="Nuts"
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email de contacto</label>
            <input
              disabled
              defaultValue="contacto@nuts.com"
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Teléfono</label>
            <input
              disabled
              defaultValue="+54 9 11 0000-0000"
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Moneda</label>
            <input
              disabled
              defaultValue="ARS ($)"
              className="rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* NOTIFICACIONES */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Bell size={20} />
          </div>
          <h2 className="font-bold text-lg">Notificaciones</h2>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: "Nuevo pedido recibido", checked: true },
            { label: "Producto con stock bajo", checked: true },
            { label: "Nueva cuenta de cliente registrada", checked: false },
          ].map((item) => (
            <label
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-sm">{item.label}</span>
              <input
                type="checkbox"
                disabled
                defaultChecked={item.checked}
                className="w-5 h-5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* SEGURIDAD */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <ShieldCheck size={20} />
          </div>
          <h2 className="font-bold text-lg">Seguridad</h2>
        </div>

        <p className="text-sm text-gray-500">
          El cambio de contraseña y la gestión de sesiones van a estar disponibles próximamente.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          disabled
          title="Próximamente disponible"
          className="rounded-xl bg-primary px-5 py-3 font-bold text-white opacity-50 cursor-not-allowed"
        >
          Guardar cambios
        </button>
      </div>
    </section>
  );
}
