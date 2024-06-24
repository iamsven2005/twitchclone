//homepage for shopfront
import { db } from "@/lib/db";
import getProducts from "../components/get/get-products";
import ProductList from "../components/productcard";
import { redirect } from "next/navigation";
import getbillboards from "../components/get/get-billboards";
import Billboardcard from "../components/billboard";
import { currentUser } from "@clerk/nextjs";
import { getUserByUsername } from "@/lib/user-service";

interface shopprops{
  params:{
    storeId: string;
  }
}
export default async function Shop({
  params,
}:shopprops) {
  const store = await db.store.findFirst({ 
    where: {
      id: params.storeId,
    }
   });
   if (!store) {
    redirect(`/`);
  };
  const data = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  const Billboard = await getbillboards(data, store.id);

  const products = await getProducts( {isFeatured: true}, data, store.id)
  const userparams = await currentUser();

  if (!userparams) {
    return null;
  }

  let self = null;

  if (userparams.username) {
    self = await getUserByUsername(userparams.username);
  }
  return (
  <div className="flex container flex-col">
    <input type="checkbox"         
value={self?.theme ?? "default"} 
 className="invisible theme-controller" checked disabled/>
    <Billboardcard Billboard={Billboard}/>
    <ProductList
    products={products}
    id={store.id}
    />
  </div>

  );
}
