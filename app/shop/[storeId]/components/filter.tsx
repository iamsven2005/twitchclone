"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Color, Size } from "../actions/types";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface filterprops{
    data: (Size | Color)[];
    name: string;
    value: string;
}
const Filter = ({
data,
name,
value,
}:filterprops) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const selected = searchParams.get(value);
    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            [value]: id
        }
        if (current[value]===id){
            query[value] = null;
        }
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        },{
            skipNull: true
        })
        router.push(url)
    }
    return ( 
        <div>
            {name}
            {data.map((route)=>(
                <div key={route.id}>
                    <Button
                    onClick={()=>onClick(route.id)}
                    className={cn("btn", selected === route.id && "btn-info")}
                    >
                        {route.name}
                    </Button>
                </div>
            ))}
        </div>
     );
}
 
export default Filter;