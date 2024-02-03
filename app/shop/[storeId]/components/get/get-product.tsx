import { Product } from "../../actions/types";

const getProduct = async (id: string, baseURL: string, store: string): Promise<Product> => {
  const STORE_URL = `${baseURL}/api/${store}/products/${id}`;
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getProduct;