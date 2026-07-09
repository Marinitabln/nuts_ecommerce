import { KpiCard } from '@/components/dashboard/KpiCard'
import { Package, PackageMinus, ShoppingBag, Users } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 mb-6">
      <KpiCard 
        title="Total de Ventas"
        metric={{ value: 2684, changePercent: 12.5, trend: 'up' }}
        color="primary"
        icon={<ShoppingBag />} />
      <KpiCard 
        title="Total de productos"
        metric={{ value: 158, changePercent: 12.5, trend: 'up' }}
        color="primary"
        icon={<Package />} />
      <KpiCard 
        title="Total de Clientes"
        metric={{ value: 247, changePercent: 12.5, trend: 'up' }}
        color="primary"
        icon={<Users />} />
      <KpiCard 
        title="Productos bajo stock"
        metric={{ value: 10, changePercent: 12.5, trend: 'up' }}
        color="primary"
        icon={<PackageMinus />} />
        </div>
    </div>
  )
}

export default page
