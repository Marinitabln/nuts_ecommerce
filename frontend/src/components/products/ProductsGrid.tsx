"use client";

import ProductCard from "./ProductCard";
import PaginationControls from "../ui/PaginationControls";
import { useGetProducts } from "@/services/query-services/products-query";
import { usePagination } from "@/hooks/usePagination";
import Container from "../ui/Container";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

interface ProductsGridProps {
    selectedCategory: string | null;
    search?: string;
}

const ProductsGrid = ({ selectedCategory, search = "" }: ProductsGridProps) => {
    const { data: products = [], isLoading, error } = useGetProducts();

    const activeProducts = products.filter((product) => product.active !== false);

    const categoryFiltered = selectedCategory
        ? activeProducts.filter((product) => product.category === selectedCategory)
        : activeProducts;

    const filteredProducts = search.trim()
        ? categoryFiltered.filter((product) =>
            product.name.toLowerCase().includes(search.trim().toLowerCase())
        )
        : categoryFiltered;
    const { currentItems, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredProducts, ITEMS_PER_PAGE);

    return (
        <Container>
            <section className="flex flex-col gap-10 w-full max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {isLoading && <p className="text-md text-primary">Cargando productos...</p>}
                    {error && <p className="text-md text-primary">Error al cargar los productos. Intente recargando la página.</p>}
                    {currentItems.length > 0 ? (
                        currentItems.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                                className="w-full"
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    category={product.category}
                                    imageUrl={product.imageUrl}
                                    presentations={
                                        product.presentations
                                    }
                                />
                            </motion.div>
                        ))
                    ) : (
                        <p className="col-span-4 text-center text-secondary py-10 w-full">
                            {search.trim()
                                ? `No se encontraron productos para "${search.trim()}"`
                                : "No se encontraron productos en esta categoría"}
                        </p>
                    )}
                </div>

                {totalPages > 1 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                )}
            </section>
        </Container>
    );
};

export default ProductsGrid;