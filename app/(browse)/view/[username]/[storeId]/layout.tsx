import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { db as prismadb } from "@/lib/db";
import MainNav from './components/MainNav';
import getCategories from './components/get/get-categories';
import getbillboards from './components/get/get-billboards';
import getProduct from './components/get/get-products';
import NoResults from './components/noresults';
import { formatter } from '@/lib/utils';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
      userId,
    }
   });

  
  if (!store) {
    redirect(`/`);
  };
  const data = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';


  const Categories = await getCategories(data, store.id);
  const Billboard = await getbillboards(data, store.id);
  const products = await getProduct( {isFeatured: true}, data, store.id)
  return (
    <>
    <MainNav store={store.id}data={Categories}/>
    <div className="carousel w-full">

    {Billboard.map((route) => (
        <div key={route.id} className="carousel-item w-full ">
          <div style={{backgroundImage: `url(${route.imageUrl})`}} className="rounded-xl hero-content w-full text-center h-100 bg-no-repeat"><h1 className="text-5xl font-bold">{route.label}</h1></div>
        </div> 
      ))}     
      </div>
      <div className="card-title font-bold">
        Featured Products
      </div>
      {products.length === 0 && <NoResults/>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {products.map((route) => (
        <div key={route.id} className="card w-96 bg-primary-100 shadow-xl">
        <figure className="carousel rounded-box">
        {route.images.map((image)=>(
          <div key={image.id} className="carousel-item w-full">
          <img src={image.url}/>
          </div>
        ))}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{route.name}</h2>
          <p>Category: {route.category.name}</p>
          <p>Color: {route.color.name}</p>
          {formatter.format(Number(route.price))}
          <div className="card-actions justify-end">
            <Link href={`/view/${store.id}/product/${route.id}`}className="btn btn-primary">Buy Now</Link>
          </div>
        </div>
      </div>
      ))}  
      </div>

 
      {children}
    </>
  );
};