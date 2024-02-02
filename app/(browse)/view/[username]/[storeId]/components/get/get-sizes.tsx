import { Category } from "../../actions/types";

const getbillboards = async (baseURL: string, store: string): Promise<Category[]> => {
  const STORE_URL = `${baseURL}/api/${store}/billboards`;
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getbillboards;