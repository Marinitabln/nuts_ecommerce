"use client"

import BenefitsBar from "@/components/benefits/BenefitsBar";
import HeroCarousel from "@/components/hero/HeroCarousel";
import Filters from "@/components/products/Filters";
import ProductsGrid from "@/components/products/ProductsGrid";
import { useState } from "react";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <>
      <HeroCarousel />
      <BenefitsBar />
      <Filters selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductsGrid selectedCategory={selectedCategory} />
    </>)
}
