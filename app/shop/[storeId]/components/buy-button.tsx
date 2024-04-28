"use client"
import { useCart } from "@/hooks/use-preview-modal";
import { Product } from "../actions/types";
import { MouseEventHandler } from "react";

interface btnprops{
    product: Product;
}
const Storebutton = ({
    product,
}:btnprops) => {
    const cart = useCart();
    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation();
      cart.addItem(product);
    }
    return (
        <button 
        className="btn btn-outline"
        onClick={onAddToCart}
        >Add to cart</button>

      );
}
 
export default Storebutton;