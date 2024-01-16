import { useState } from "react";
import { CopyButton } from "../reuse/copy-button";
interface UrlCardProps {
    value: string | null;
}
export const UrlCard = ({
    value,
}: UrlCardProps) => {
    return(
        <div className="card-body bg-base-100 shadow-xl ">
            <div className="card-title">
            Server URL
            <input
            className="input input-bordered w-full gap-x-2"
            value={value || ""}
            disabled
            placeholder="Server Url"/>
            <CopyButton
            value={value || ""}/>
            </div>

        </div>
    )
}