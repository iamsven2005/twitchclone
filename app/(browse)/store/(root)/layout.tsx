import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { db as prismadb } from "@/lib/db";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    }
  });

  if (store) {
    redirect(`/store/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};