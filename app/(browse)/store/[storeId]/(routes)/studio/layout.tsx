import { redirect } from 'next/navigation';
import { db as prismadb } from "@/lib/db";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {

  return (
    <>
      {children}
    </>
  );
};