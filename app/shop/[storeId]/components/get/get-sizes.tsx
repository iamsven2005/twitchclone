import { Size } from "../../actions/types";

const getSizes = async (baseURL: string, store: string): Promise<Size[]> => {
  const STORE_URL = `${baseURL}/api/${store}/sizes`;
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getSizes;