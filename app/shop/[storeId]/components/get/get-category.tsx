import { Category } from "../../actions/types";

const getCategory= async (baseURL: string, store: string, id: string): Promise<Category> => {
  const STORE_URL = `${baseURL}/api/${store}/categories/${id}`;
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getCategory;