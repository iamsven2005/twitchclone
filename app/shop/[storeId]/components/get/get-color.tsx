import { Color } from "../../actions/types";

const getColors = async (baseURL: string, store: string): Promise<Color[]> => {
  const STORE_URL = `${baseURL}/api/${store}/colors`;
  const res = await fetch(STORE_URL);
  return res.json();
};

export default getColors;