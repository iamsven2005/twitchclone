"use client";
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
    Fullscreen,
    KeyRound, 
    MessageSquare, 
    Users } from "lucide-react"

export const Logo3 = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Check if the window object is defined (client-side)
    if (typeof window !== 'undefined') {
      // Set the initial window width
      setWindowWidth(window.innerWidth);

      // Update window width on resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Remove event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);   
    return (
        <div>
        {windowWidth < 640 ? (
          <div style={{ display: 'none' }}> </div>
        ) : (
        <div>
        <div id="logo" className="btn btn-ghost text-xl">Creator Studio</div>
        </div>
                )}
      </div>

        
    )
}
export const CreateActions = () =>{
    return (
        <div>
            actions
        </div>
        
    )  
}

export const CreateBar = () =>{
    const pathName = usePathname();
    const {user} = useUser();
    const routes = [
        {
            label:"Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen,
        },
        {
            label:"Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound,
        },
        {
            label:"Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare,
        },
        {
            label:"Community",
            href: `/u/${user?.username}/community`,
            icon: Users,
        },
    ];
    return (
        <div>
        <p className="stat-value">Creator Tools</p>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            {routes.map((route) => (
                <li key={route.href}>
                    {route.label}
                </li>
            ))}
        </ul>
        </div>

        
    )  ;
};