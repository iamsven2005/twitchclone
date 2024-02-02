import MainNav from "./MainNav";
import getCategories from "./get-categories";

const Navbar = async() => {
    const Categories = await getCategories();
    return ( 
    <div>
        Store
        <MainNav data={Categories}/>

    </div>
     );
}
 
export default Navbar;