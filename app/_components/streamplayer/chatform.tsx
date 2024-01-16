"use client";

import { useState } from "react";

interface ChatProps{
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden:boolean;
    isFollowsOnly:boolean;
    isFollowing: boolean;
    isDelayed: boolean;
};
export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowsOnly,
    isFollowing,
    isDelayed,
}:ChatProps) => {
    const [isDelayedBlk, setisDelayedBlk] = useState(false);
    const isNotFollowing = !isFollowing && !isFollowsOnly;
    const isDisabled = isHidden || isDelayedBlk || isNotFollowing;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!value || isDisabled) return;
        if(isDelayed && !isDelayedBlk) {
            setisDelayedBlk(true);
            setTimeout(()=>{
            setisDelayedBlk(false);
            },3000)
        }
        else{
            onSubmit();
        }
    }
    if (isHidden) {
        return null;
    }
    return(
        <form onSubmit={handleSubmit} className="join card-actions justify-center">

            <input
            disabled={isDisabled}
            onChange={(e) => onChange(e.target.value)}
            value={value} 
            type="text" 
            placeholder="Type here" 
            className="join-item input input-bordered input-info w-full max-w-xs" />
        <button
        type="submit"
        className="btn btn-primary join-item"
        disabled={isDisabled}>
            Send
        </button>
        </form>

    )
}
