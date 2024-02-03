import { Category } from "../../actions/types";

const getCategories = async (baseURL: string, store: string): Promise<Category[]> => {
  const STORE_URL = `${baseURL}/api/${store}/categories`;
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getCategories;