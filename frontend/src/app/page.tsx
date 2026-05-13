"use client"

import Header from "@/components/layout/Header";
import ProductsGrid from "@/components/products/ProductsGrid";


export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <Header />
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-32 sm:items-start">
        <ProductsGrid />
      </main>
    </div>
  );
}
