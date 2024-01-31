"use client"
import { Unauthenticated } from "convex/react";
import { Logo } from "../_components/reuse/logo";
import Link from "next/link";
const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="hero min-h-screen"> 
        <div className="hero-content text-center">
        <div className="max-w-md ">   
        <Logo/>    
        {children}
        <Link href="/Shop"className="btn">
         Visit shop   
        </Link>
        </div>
        </div>
        </div>


     );
}
export default AuthLayout;