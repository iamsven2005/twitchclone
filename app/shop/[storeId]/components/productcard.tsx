"use client"
import { formatter } from "@/lib/utils";
import { Product } from "../actions/types";
import NoResults from "./noresults";
import Link from "next/link";
import Gallery from "./gallery";

interface Billboardprops {
products: Product[];
id: string;
}
const ProductList = ({
products,
id
}:Billboardprops) => {
    return ( 
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 w-90">
        {products.length === 0 && <NoResults/>}
        {products.map((route) => (
          <div key={route.id} className="flex w-90 bg-primary-100 shadow-xl items-center bg-destructive">
          <div className="card-body">
          <Gallery images={route.images}/>

            <h2 className="card-title">{route.name}</h2>
            <p>Category: {route.category.name}</p>
            <p>Color: {route.color.name}</p>
            {formatter.format(Number(route.price))}
            <div className="card-actions justify-end">
              <Link href={`/shop/${id}/product/${route.id}`}className="btn btn-primary">Buy Now</Link>
            </div>
          </div>
        </div>
        ))}  
        </div>
     );
}
 
export default ProductList;