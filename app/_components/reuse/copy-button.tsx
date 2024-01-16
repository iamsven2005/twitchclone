"use client";

import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyClientProps {
    value?: string;
};
export const CopyButton = ({
    value,
}: CopyClientProps) => {
    const [isCopied, setisCopied] = useState(false);
    const onCopy = () => {
        if(!value) return;
        setisCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(()=>{
            setisCopied(false)
        }, 1000);
    };
    const Icon = isCopied ? CheckCheck : Copy;
    return (
        <button
        onClick={onCopy}
        disabled={!value || isCopied}
        className="btn btn-ghost"
        ><Icon className="h-4 w-4"/>
        </button>
    )
}