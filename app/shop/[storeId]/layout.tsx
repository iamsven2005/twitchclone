import { redirect } from 'next/navigation';
import { db as prismadb } from "@/lib/db";
import MainNav from './components/MainNav';
import getCategories from './components/get/get-categories';
import getbillboards from './components/get/get-billboards';
import getProducts from './components/get/get-products';
import Billboardcard from './components/billboard';
import ProductList from './components/productcard';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {


  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
    }
   });

  
  if (!store) {
    redirect(`/`);
  };
  const data = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';


  const Categories = await getCategories(data, store.id);
  const Billboard = await getbillboards(data, store.id);
  const products = await getProducts( {isFeatured: true}, data, store.id)
  return (

    <div>

    <MainNav store={store.id}data={Categories}/>
    <Billboardcard Billboard={Billboard}/>
    {children}

      <div className="card-title font-bold">
        Featured Products
      </div>
    <ProductList
    products={products}
    id={store.id}
    />

 

    </div>
  );
};