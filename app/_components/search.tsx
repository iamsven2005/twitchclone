"use client";
import qs from "query-string";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {SearchIcon, X} from "lucide-react";
 export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) return;
        const url = qs.stringifyUrl({
            url:"/search",
            query: { term: value},

        },
        {
            skipEmptyString:true
        }
        );
        router.push(url);

    }
    const onClear = () => {
        setValue("");
    }
    return (
        <form className="tooltip tooltip-bottom flex" data-tip="search" onSubmit={onSubmit}>
        <input type="Submit" className="btn" value="&#x1F50D;"/>
        <input value={value} onChange={(e)=>setValue(e.target.value)}type="text" placeholder="Search" className="input input-ghost" />
        {value && (
            <div className="tooltip tooltip-bottom" data-tip="clear">
            <p className="btn" onClick={onClear}>X</p>
            </div>
        )}
        </form> 
     );
};