"use client";
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
    Fullscreen,
    KeyRound, 
    MessageSquare, 
    Settings, 
    Users,
    Plus,
    Store
 } from "lucide-react"
import { NavItem } from './reuse/nav-item';
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
        <div id="logo" className="btn btn-ghost text-xl">CREATOR</div>
        </div>
                )}
      </div>

        
    )
}
export const CreateActions = () =>{
    return (
        <a className="btn btn-outline btn-accent"href="/">
            Home
        </a>
        
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
    const settings = [
        {
            label:"Settings",
            href: `/u/${user?.username}/settings`,
            icon: Settings,
        },
        {
            label:"New Board",
            href: `/u/${user?.username}/board`,
            icon: Plus,
        },
        {
            label:"Manage Shop",
            href: `/store`,
            icon: Store,
        },
    ];
    return (
        <div>
        <p className="text-lg">Creator Tools</p>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <div className="text-small">
                General
            </div>
            {settings.map((settings) => (
                <NavItem 
                key={settings.href}
                label={settings.label}
                icon={settings.icon}
                href={settings.href}
                isActive={pathName === settings.href}/>
            ))}
        </ul>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <div className="text-small">
                Stream
            </div>
            {routes.map((route) => (
                <NavItem 
                key={route.href}
                label={route.label}
                icon={route.icon}
                href={route.href}
                isActive={pathName === route.href}/>
            ))}
        </ul>
        </div>

        
    )  ;
};
