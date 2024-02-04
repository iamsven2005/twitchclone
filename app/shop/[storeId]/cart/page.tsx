"use client"

import { useCart } from "@/hooks/use-preview-modal";
import { useEffect, useState } from "react";
import CartItem from "../components/cartitem";
import Summary from "../components/summary";
interface idprops{
    params:{
        storeId:string;
    }
}
const CartPage = ({
    params,
}:idprops) => {
    const cart = useCart();
    return ( 
        <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold ">Shopping Cart</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                <div className="lg:col-span-7">
                    {cart.items.length === 0 && 
                    <p className="text-neutral-500">
                        No items in cart
                    </p>}
                    <ul>
                        {cart.items.map((item)=>(
                            <CartItem
                            key={item.id}
                            data={item}
                            />
                            ))}
                    </ul>
                </div>
                <Summary id={params.storeId}/>

            </div>
        </div>
     );
}
 
export default CartPage;