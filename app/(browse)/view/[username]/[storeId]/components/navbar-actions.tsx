"use client"
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, [])
    if (!isMounted){
        return null;
    }
    return ( 
        <div>
            <ShoppingBag/>
        </div>
     );
}
 
export default NavbarActions;