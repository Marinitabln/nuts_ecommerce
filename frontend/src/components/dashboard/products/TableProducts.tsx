import { ProductType } from '@/types/product.types';
import { PackageCheck, PackageX, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface TableProductsProps {
    products: ProductType[];
    getTotalStock: (product: ProductType) => number;
    handleEdit: (product: ProductType) => void;
    handleDelete: (productId: string) => void;
    isLoading: boolean;
}

const TableProducts = ({ products, getTotalStock, handleEdit, handleDelete, isLoading }: TableProductsProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl p-4 bg-white shadow-sm hidden md:block" >

        <table className="w-full min-w-[900px] ">
          <thead className="border-b border-primary">
            <tr className="text-left">

              <th className="p-2 font-semibold"> Producto </th>
              <th className="p-2 font-semibold hidden md:table-cell"> Categoría</th>
              <th className="p-2 font-semibold hidden md:table-cell"> Presentaciones</th>
              <th className="p-2 font-semibold hidden md:table-cell"> Precio</th>
              <th className="p-2 font-semibold hidden md:table-cell"> Stock</th>
              <th className="p-2 font-semibold"> Estado</th>
              <th className="p-2 font-semibold text-right"> Acciones </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={7}
                  className="p-10 text-center"
                >
                  Cargando productos...
                </td>
              </tr>
            )}

            {!isLoading &&
              products.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-gray-500"
                  >
                    No se encontraron productos
                  </td>
                </tr>
              )}

            {!isLoading &&
              products.map(
                (product) => {
                  console.log(product);

                  return (
                    <tr
                      key={product.id}
                      className="
                        border-b
                        border-secondary
                        hover:bg-secondary/20
                        transition-colors
                      "
                    >
                      {/* PRODUCT */}
                      <td className="p-4">

                        <div className="flex items-center gap-4">

                          <div className="w-[60px] h-[60px] overflow-hidden rounded-xl shrink-0">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              width={60}
                              height={60}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <h3 className="font-semibold"> {product.name} </h3>

                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="p-4 capitalize hidden md:table-cell">
                        {product.category}
                      </td>

                      {/* PRESENTATIONS */}
                      <td className="p-4 hidden md:table-cell">

                        <div className="flex flex-col gap-1">

                          {product.presentations?.map(
                            (
                              presentation
                            ) => (
                              <span
                                key={
                                  presentation.label
                                }
                                className=" w-fit text-xs bg-gray-100 px-2 py-1 rounded-full" >
                                {
                                  presentation.label
                                }
                              </span>
                            )
                          )}
                        </div>
                      </td>

                      {/* PRICE */}
                      <td className="p-4 font-semibold text-primary hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                          {product.presentations?.map(
                            (
                              presentation, index
                            ) => (
                              <span
                                key={
                                  index
                                }
                                className=" w-fit text-xs px-2 py-1" >
                                {
                                  `$ ${presentation.finalPrice}`
                                }
                              </span>
                            )
                          )}
                        </div>
                      </td>

                      {/* STOCK */}
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                          {product.presentations?.map(
                            (
                              presentation, index
                            ) => (
                              <span
                                key={
                                  index
                                }
                                className=" w-fit text-xs  px-2 py-1" >
                                {
                                  presentation.stock
                                }
                              </span>
                            )
                          )}

                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="p-4">

                        {getTotalStock(product) > 0 ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-sm text-success">
                            <PackageCheck size={16} strokeWidth={2.5} />
                            <span className="hidden lg:inline">Disponible</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-error/10 px-3 py-1 text-sm text-error">
                            <PackageX size={16} strokeWidth={2.5} />
                            <span className="hidden lg:inline"> Sin stock </span>
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">

                        <div className="flex items-center justify-end gap-3">

                          <button onClick={() => handleEdit(product)} className=" p-2 rounded-lg text-primary hover:bg-gray-100 transition-colors">
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                product.id
                              )
                            }
                            className="
                              p-2
                              rounded-lg
                              hover:bg-error/10
                              text-error
                              transition-colors
                            "
                          >
                            <Trash2
                              size={18}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
  )
}

export default TableProducts
