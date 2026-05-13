"use client";

import ProductCard from "./ProductCard";
import PaginationControls from "../ui/PaginationControls";

import { useGetProducts } from "@/services/query-services/products-query";
import { usePagination } from "@/hooks/usePagination";

const ITEMS_PER_PAGE = 6;

const ProductsGrid = () => {
    const {data: products = [], isLoading, error } = useGetProducts();

    const {currentItems, currentPage, totalPages, nextPage, prevPage  } = usePagination(products, ITEMS_PER_PAGE );


    return (
        <section className="flex flex-col gap-10 w-full">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {isLoading && <p className="text-md text-primary">Cargando productos...</p>}
                    {error && <p className="text-md text-primary">Error al cargar los productos. Intente recargando la página.</p>}
                {currentItems.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        category={product.category}
                        imageUrl={product.imageUrl}
                        presentations={product.presentations}
                    />
                ))}
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
    );
};

export default ProductsGrid;