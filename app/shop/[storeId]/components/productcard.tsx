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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {products.length === 0 && <NoResults/>}
        {products.map((route) => (
          <div key={route.id} className="card w-96 bg-primary-100 shadow-xl">
          <Gallery images={route.images}/>
          <div className="card-body">
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