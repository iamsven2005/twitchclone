import { Product } from "../../actions/types";
import qs from "query-string"
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;

}
const getProducts = async (query: Query, baseURL: string, store: string): Promise<Product[]> => {
  const STORE_URL = `${baseURL}/api/${store}/products`;
  const newurl = qs.stringifyUrl({
    url: STORE_URL,
    query:{
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    }

  })
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getProducts;