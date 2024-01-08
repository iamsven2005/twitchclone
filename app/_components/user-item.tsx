"use client";
import { usePathname } from "next/navigation";
interface UserItemProps {
    username: string;
    imageUrl: string;
    isLive?: boolean;
};
export const UserItem = ({
    username,
    imageUrl,
    isLive,
}: UserItemProps) => {
    const pathname = usePathname();
    const href = `/${username}`;
    const isActive = pathname === href;
    return(
        <a href={href} className="btn btn-ghost" >
        <div className="avatar">
        <div className="w-10 rounded-full">
            <img src={imageUrl} alt={username}/>
        </div>
        </div>    
            {username}
            {isLive && <div className="badge badge-accent">Streaming</div>}

        </a>
    );
};