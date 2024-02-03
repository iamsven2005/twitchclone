import Filter from "../../components/filter";
import getCategory from "../../components/get/get-category";
import getColors from "../../components/get/get-color";
import getProducts from "../../components/get/get-products";
import getSizes from "../../components/get/get-sizes";
export const revalidate = 0;
interface CategoryProps{
    params:{
        categoryId: string;
        storeId: string;
    }
    searchParams:{
        colorId: string;
        sizeId: string;

    }
}
const Category = async({
    params,
    searchParams,
}:CategoryProps) => {
    const newid = params.storeId

    const data = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
    },
    data,
    newid,
    )
    const sizes = await getSizes(data,newid);
    const colors = await getColors(data,newid);
    const category = await getCategory(data,newid,params.categoryId);



    return (  
        <div>
            <div  className="carousel-item w-full ">
              <div style={{backgroundImage: `url(${category.billboard.imageUrl})`}} 
              className="rounded-xl hero-content w-full text-center bg-no-repeat">
                <h1 className="text-5xl font-bold">{category.billboard.label}</h1></div>
            </div> 
            <Filter
            value="sizeId"
            name="Sizes"
            data={sizes}/>
        </div>

    );
}
 
export default Category;