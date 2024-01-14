"use client";

import { Maximize, Minimize } from "lucide-react";

interface FullscreenProps{
    isFullscreen:boolean;
    onToggle: () => void;
};
export const FullscreenCrtl = ({
    isFullscreen,
    onToggle,
}:FullscreenProps) => {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

    return(
    <div className="hero">
        <div className="tooltip" data-tip={label}>
        <button className="btn"
        onClick={onToggle}
        
        ><Icon className="w-5 h-5"/></button>
        </div>
    </div>

    )
}
