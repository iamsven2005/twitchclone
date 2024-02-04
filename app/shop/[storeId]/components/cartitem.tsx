"use client"

import Image from "next/image";
import { Product } from "../actions/types";
import { Currency, X } from "lucide-react";
import { useCart } from "@/hooks/use-preview-modal";

interface cartprops {
    data: Product;
};
const CartItem = ({
    data,
}: cartprops) => {
    const cart = useCart();
    const onRemove = () => {
        cart.removeItem(data.id)
    }
    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.images[0].url}
                    alt={data.name}
                    className="object-cover object-center" />

            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <button 
            className="absolute z-10 right-0 top-0"
            onClick={onRemove}
            >
                    <X className="btn btn-sm btn-circle" />
            </button>
                <div className="relative pr-9 sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">
                        {data.name}
                    </p>
                </div>
                <div className="mt-1 flex text-sm gap-2">
                    <p className="text-gray-500">
                        {data.color.name}
                    </p>
                    <div className="btn btn-circle btn-xs btn-outline"
                        style={{ backgroundColor: data?.color?.value }}> 
                    </div>
                    <p className="text-gray-500">
                        Category: {data.category.name}
                    </p>
                    <p>
                        Size: {data.size.name}
                    </p>
                </div>
                <p>
                    ${data.price}
                </p>
            </div>
            
            </div>
        </li>
    );
}

export default CartItem;