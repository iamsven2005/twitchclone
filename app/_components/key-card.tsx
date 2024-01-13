"use client";
import { useState } from "react";
import { CopyButton } from "./copy-button";
interface KeyCardProps {
    value: string | null;
}
export const KeyCard = ({
    value,
}: KeyCardProps) => {
    const [show, setShow] = useState(false);
    return(
        <div className="card-body bg-base-100 shadow-xl ">
            <div className="card-title">
            Stream Key
            <input
            className="input input-bordered w-full gap-x-2"
            value={value || ""}
            type={show? "text" : "password"}
            disabled
            placeholder="Stream Key"/>
            <CopyButton
            value={value || ""}/>
            <label className="swap " >
            <input type="checkbox" className="tooltip" data-tip={show?"show": "hide"} onClick={()=> setShow(!show)}/>
            <p className="btn btn-ghost swap-on">👀</p>
            <p className="btn btn-ghost swap-off">😆</p>
            </label>
            </div>

        </div>
    )
}