"use client"
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-preview-modal";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface storeprops{
    id: string
}
const NavbarActions = ({
    id
}:storeprops) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, [])
    const router = useRouter();
    const cart = useCart();
    if (!isMounted){
        return null;
    }
    return ( 
        <div>
            <Button className="btn"
            onClick={()=>router.push(`/shop/${id}/cart`)}
            >
            <ShoppingBag/>
            <span>
                {cart.items.length}
            </span>
            </Button>
        </div>
     );
}
 
export default NavbarActions;