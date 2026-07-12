"use client";

import { KpiCard } from "@/components/dashboard/KpiCard";
import { ClipboardList, Clock, PackageCheck, DollarSign } from "lucide-react";

interface MockOrder {
  id: string;
  customerName: string;
  date: string;
  itemsCount: number;
  total: number;
  status: "pendiente" | "en proceso" | "entregado" | "cancelado";
}

const MOCK_ORDERS: MockOrder[] = [
  { id: "1042", customerName: "Marina Blanco", date: "09/07/2026", itemsCount: 3, total: 12400, status: "entregado" },
  { id: "1041", customerName: "Julián Pérez", date: "09/07/2026", itemsCount: 1, total: 4900, status: "en proceso" },
  { id: "1040", customerName: "Sofía Gómez", date: "08/07/2026", itemsCount: 5, total: 21300, status: "pendiente" },
  { id: "1039", customerName: "Nicolás Fernández", date: "07/07/2026", itemsCount: 2, total: 8600, status: "entregado" },
  { id: "1038", customerName: "Camila Ortiz", date: "06/07/2026", itemsCount: 4, total: 15800, status: "cancelado" },
  { id: "1037", customerName: "Tomás Ibáñez", date: "05/07/2026", itemsCount: 2, total: 6200, status: "entregado" },
  { id: "1036", customerName: "Valentina Ríos", date: "04/07/2026", itemsCount: 1, total: 3200, status: "pendiente" },
];

const STATUS_STYLES: Record<MockOrder["status"], string> = {
  pendiente: "bg-gray-200 text-gray-600",
  "en proceso": "bg-primary/10 text-primary",
  entregado: "bg-success/10 text-success",
  cancelado: "bg-error/10 text-error",
};

const totalFacturado = MOCK_ORDERS.reduce((acc, order) => acc + order.total, 0);
const pendientes = MOCK_ORDERS.filter((order) => order.status === "pendiente").length;
const entregados = MOCK_ORDERS.filter((order) => order.status === "entregado").length;

export default function PedidosPage() {
  return (
    <section className="w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Pedidos</h1>
        <p className="text-gray-500 mt-1">Seguimiento de pedidos de la tienda</p>
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-primary">
        Datos de ejemplo — la gestión de pedidos en tiempo real todavía no está conectada.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        <KpiCard
          title="Total de pedidos"
          metric={{ value: MOCK_ORDERS.length, changePercent: 8, trend: "up" }}
          color="primary"
          icon={<ClipboardList />}
        />
        <KpiCard
          title="Pendientes"
          metric={{ value: pendientes, changePercent: 0, trend: "stable" }}
          color="secondary"
          icon={<Clock />}
        />
        <KpiCard
          title="Entregados"
          metric={{ value: entregados, changePercent: 5, trend: "up" }}
          color="success"
          icon={<PackageCheck />}
        />
        <KpiCard
          title="Facturación"
          metric={{ value: totalFacturado, changePercent: 12.5, trend: "up" }}
          color="primary"
          icon={<DollarSign />}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-2xl p-4 bg-white shadow-sm">
        <table className="w-full min-w-[700px]">
          <thead className="border-b border-primary">
            <tr className="text-left">
              <th className="p-3 font-semibold">Pedido</th>
              <th className="p-3 font-semibold">Cliente</th>
              <th className="p-3 font-semibold hidden md:table-cell">Fecha</th>
              <th className="p-3 font-semibold hidden md:table-cell">Items</th>
              <th className="p-3 font-semibold">Total</th>
              <th className="p-3 font-semibold">Estado</th>
            </tr>
          </thead>

          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr
                key={order.id}
                className="border-b border-secondary hover:bg-secondary/20 transition-colors"
              >
                <td className="p-3 font-semibold">#{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3 hidden md:table-cell text-gray-500">{order.date}</td>
                <td className="p-3 hidden md:table-cell text-gray-500">{order.itemsCount}</td>
                <td className="p-3 font-semibold text-primary">${order.total}</td>
                <td className="p-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
