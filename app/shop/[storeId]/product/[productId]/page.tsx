import Storebutton from "../../components/buy-button";
import Gallery from "../../components/gallery";
import getProduct from "../../components/get/get-product";
import getProducts from "../../components/get/get-products";
import ProductList from "../../components/productcard";

interface productprops {
    params:{
        productId: string;
        storeId: string;
    }
}
const Products = async({
    params,
}:productprops) => {
    const data = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const product = await getProduct(params.productId,data,params.storeId)
    const suggested = await getProducts({
        categoryId: product?.category?.id
    },
    data,
    params.storeId,
     
    )

    return ( <div className="w-full">

<div className="min-h-screen bg-base-200 items-center m-0 sm:m-5 p-10 w-full">
  <div className="flex-col lg:flex-row w-90">
  <Gallery images={product.images}
/>
    <div>
      <h1 className="text-5xl font-bold">
        {product.name}
    </h1>
    ${product.price}
      <p className="py-3">Size: {product?.size?.name} , {product?.size?.value}</p>
      <p className="py-3">
            Color: {product?.color?.name}
        </p>
        <div className="rounded-full h-6 w-6" 
        style={{backgroundColor: product?.color?.value}}> </div>
        <p className="py-3">Category: {product.category.name}</p>
        <Storebutton
        product={product}/>
    </div>
  </div>
</div>
<h1 className="text-bold">
Same Category
    </h1>
<ProductList
products={suggested}
id={params.storeId}
/>

    </div> );
}
 
export default Products;