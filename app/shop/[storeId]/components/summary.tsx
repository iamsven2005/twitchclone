"use client"

import { useCart } from "@/hooks/use-preview-modal";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
interface idprops{
    id: string;
}
const Summary = ({
    id,
}:idprops) => {
    const data = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
    const items = useCart((state)=> state.items);
    const searchparams = useSearchParams();
    const removeAll = useCart((state)=> state.removeAll)
    const totalprice = items.reduce((total, item)=> {
        return total + Number(item.price)
}, 0)
    useEffect(()=>{
        if(searchparams.get("success")){
            toast.success("Payment Completed")
            removeAll();
        }
        if(searchparams.get("canceled")){
            toast.error("Payment Cancelled")
        }
    },[searchparams, removeAll])
    const checkout = async() => {
        const response = await axios.post(`${data}/api/${id}/checkout`,{
            productIds: items.map((item)=> item.id),
        })
        window.location = response.data.url;
    }
    return ( 
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium">
                Order Summary
            </h2>
            <div className=" text-neutral flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="font-medium">
                Order Total
            </div>
            ${totalprice} 
            </div>
            <button
            onClick={checkout} 
            className="btn btn-block btn-neutral">
                Check Out 
            </button>
        </div>
     );
}
 
export default Summary;
