"use client";
import React, { useState, useEffect } from 'react';
import { formatter } from "@/lib/utils";
import { Product } from "../actions/types";
import NoResults from "./noresults";
import Gallery from "./gallery";
import Storebutton from "./buy-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-preview-modal";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Billboardprops {
  products: Product[];
  id: string;
}

const ProductList = ({
  products,
  id
}: Billboardprops) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => {
        // Check if each field exists and is not undefined before attempting toLowerCase()
        const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = product.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const colorMatch = product.color?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const sizeMatch = product.size?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        // Return true if any of the conditions match
        return nameMatch || descriptionMatch || categoryMatch || colorMatch || sizeMatch;
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(()=>{
      setIsMounted(true);
  }, [])
  const router = useRouter();
  const cart = useCart();
  if (!isMounted){
      return null;
  }
  return (
    <div className="container flex flex-col">
              <div className="flex flex-row container">
            <Button className="btn"
            onClick={()=>router.push(`/shop/${id}/cart`)}
            >
            <ShoppingBag/>
            <span>
                {cart.items.length}
            </span>
            </Button>
            <Button className="btn"
            onClick={()=>router.push("/")}
            >Back To Main Site</Button>
            <Input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
        </div>

<div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      
      {filteredProducts.length === 0 ? <NoResults /> : filteredProducts.map((product) => (
        <div key={product.id} className="card">
          <div className="card-body">
            <Gallery images={product.images} />
            <h2 className="card-title">{product.name}</h2>
            {formatter.format(Number(product.price))}
            <Dialog>
              <DialogTrigger className="btn btn-link">View Details</DialogTrigger>
              <Storebutton product={product} />
              <DialogContent className="bg-base-200">
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>
                    <div>Category: {product.category?.name}</div>
                    <div>Color: {product.color?.name}</div>
                    <div>Type: {product.size?.name}</div>
                    <div>{product.description}</div>
                    <div>{formatter.format(Number(product.price))}</div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
    </div>
    
  );
}

export default ProductList;
