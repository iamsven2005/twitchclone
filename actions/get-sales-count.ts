// for the store frontdashboard
// takes in storeid and return the count of paid sales
import { db as prismadb} from "@/lib/db";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true
    },
  });

  return salesCount;
};