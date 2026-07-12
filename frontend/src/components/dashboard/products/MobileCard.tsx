import { ProductType } from '@/types/product.types';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface MobileCardProps {
    products: ProductType[];
    getTotalStock: (product: ProductType) => number;
    handleEdit: (product: ProductType) => void;
    handleDelete: (productId: string) => void;
}


const MobileCard = ({ products, getTotalStock, handleEdit, handleDelete }: MobileCardProps) => {
    return (

        <div className="flex flex-col gap-4 md:hidden">

            {products.map((product) => (
                <div
                    key={product.id}
                    className="rounded-2xl bg-white p-4 shadow-sm ">
                    <div className="flex gap-4">

                        {/* IMAGE */}
                        <div className="w-[90px] h-[90px] overflow-hidden rounded-xl">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={90}
                                height={90}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* INFO */}
                        <div className="flex-1 flex flex-col gap-2">

                            <div>
                                <h3 className="font-semibold leading-tight">{product.name}</h3>
                                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                            </div>

                            <div className="flex items-center justify-between">

                                <span className="font-bold text-primary">
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
                                </span>

                                <div className="flex items-center gap-2">
                                    {getTotalStock(product) > 0 ? (
                                        <span className="text-success text-sm font-medium">
                                            Disponible
                                        </span>
                                    ) : (
                                        <span className="text-error text-sm font-medium">
                                            Sin stock
                                        </span>
                                    )}

                                    {product.active === false && (
                                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500">
                                            Inactivo
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-sm">
                                    Stock:
                                    {" "}
                                    <strong>
                                        {getTotalStock(product)}
                                    </strong>
                                </span>

                                <div className="flex gap-2">

                                    <button
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                        className="p-2 rounded-lg text-primary"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(product.id)
                                        }
                                        className="p-2 rounded-lg text-error"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileCard
