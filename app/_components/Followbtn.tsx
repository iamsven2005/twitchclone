"use client";
import { onFollow } from "@/lib/follow";
export const Flwbtn = () => {
    //here
    const onClick = () => {
        onFollow("123");
    };
    return (
        <button onClick={onClick} className="btn btn-success">Follow</button>
    );
  };