import { Billboard } from "../../actions/types";

const getbillboards = async (baseURL: string, store: string): Promise<Billboard[]> => {
  const STORE_URL = `${baseURL}/api/${store}/billboards`;
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getbillboards;