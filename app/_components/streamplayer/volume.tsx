"use client"

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { ChangeEvent } from 'react';

interface VolumeCtrlProps {
    onToggle: () => void;
    onChange: (value: number) => void;
    value: number;
};
export const VolumeCtrl = ({
    onToggle,
    onChange, 
    value,
}: VolumeCtrlProps) => {
    const isMuted = value === 0;
    const isAboveHalf = value > 50;
    let Icon = Volume1;
    if (isMuted) {
        Icon = VolumeX;
    }
    else if (isAboveHalf){
        Icon = Volume2;
    }
    const label = isMuted ? "Unmute" : "Muted";
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        onChange(newValue);
      };
    return (
        <div className="join">
        <div className="tooltip" data-tip={label}>
        <button className="btn join-item"
        onClick={onToggle}
        ><Icon className="h-5 w-5"/></button>
        </div>
       <input type="range" min={0} max={100} value={value} className="range join-item range-error btn" step={1} onChange={handleChange}/>

        </div>


    )
}