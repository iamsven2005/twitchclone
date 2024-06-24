//takes in the uuid of the store and return count of avaliable products
import { db as prismadb} from "@/lib/db";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    }
  });

  return stockCount;
};