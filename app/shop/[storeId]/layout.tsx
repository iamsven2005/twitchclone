import { redirect } from 'next/navigation';
import { db as prismadb } from "@/lib/db";
import MainNav from './components/MainNav';
import getCategories from './components/get/get-categories';

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
  return (

    <div>
    <MainNav name={store.name}store={store.id}data={Categories}/>
    {children}



 

    </div>
  );
};