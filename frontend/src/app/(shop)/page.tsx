"use client"

import BenefitsBar from "@/components/benefits/BenefitsBar";
import HeroCarousel from "@/components/hero/HeroCarousel";
import Filters from "@/components/products/Filters";
import ProductsGrid from "@/components/products/ProductsGrid";
import SearchBar from "@/components/products/SearchBar";
import { useState } from "react";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  return (
    <>
      <HeroCarousel />
      <BenefitsBar />
      <SearchBar value={search} onChange={setSearch} />
      <Filters selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductsGrid selectedCategory={selectedCategory} search={search} />
    </>)
}
