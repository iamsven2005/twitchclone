import { Category } from "../actions/types";

const STOREURL = `${process.env.TESTAPI}/categories`;
const getCategories = async (): Promise<Category[]> =>{
    const res = await fetch(STOREURL);
    return res.json();
}
export default getCategories;