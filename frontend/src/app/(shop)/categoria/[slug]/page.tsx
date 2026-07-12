"use client";

import { useParams } from "next/navigation";

import ProductsGrid from "@/components/products/ProductsGrid";
import Container from "@/components/ui/Container";
import { useGetProducts } from "@/services/query-services/products-query";
import { capitalizeFirst, slugify } from "@/lib/slugify";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  cereales:
    "Descubrí nuestra selección de cereales pensada para acompañarte en cada momento del día. Encontrá opciones nutritivas, crocantes y llenas de sabor. Ideales para desayunos, meriendas o para sumar energía a tus recetas favoritas.",
  "frutos secos":
    "Disfrutá de nuestra variedad de frutos secos, ideales para sumar energía, sabor y nutrición a tu día. Perfectos para snacks, desayunos, recetas o para llevar a donde quieras. Una opción natural y deliciosa para cualquier momento.",
  semillas:
    "Descubrí nuestra selección de semillas, ideales para sumar fibra, proteínas y energía a tu día. Perfectas para batidos, yogures, ensaladas o como snack saludable.",
  "productos envasados":
    "Explorá nuestra línea de productos envasados, seleccionados para sumar sabor, calidad y practicidad a tu cocina. Encontrá opciones ideales para acompañar tus comidas, preparar recetas o incorporar hábitos más saludables todos los días.",
};

const CategoriaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: products = [], isLoading } = useGetProducts();

  const categories = Array.from(new Set(products.map((product) => product.category)));
  const category = categories.find((cat) => slugify(cat) === slug);

  if (isLoading) {
    return (
      <Container>
        <p className="text-md text-primary text-center py-20">
          Cargando categoría...
        </p>
      </Container>
    );
  }

  if (!category) {
    return (
      <Container>
        <p className="text-md text-secondary text-center py-20">
          No se encontró esta categoría.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-20">
        <h2 className="text-primary text-3xl font-bold">
          {capitalizeFirst(category)}
        </h2>

        <p className="pt-6 pb-10 leading-8">
          {CATEGORY_DESCRIPTIONS[category] ??
            `Descubrí nuestra selección de ${category}.`}
        </p>

        <ProductsGrid selectedCategory={category} />
      </div>
    </Container>
  );
};

export default CategoriaPage;
