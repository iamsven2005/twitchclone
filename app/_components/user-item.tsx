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
    const href = `/view/${username}`;
    const isActive = pathname === href;
    return (
        <a href={href} className="btn btn-ghost" >
            <div className="avatar">
                <div className="w-10 rounded-full">
                    <img src={imageUrl} alt={username} />
                </div>
            </div>
            <div className="text-base">
                {username}
                {isLive && <div className="badge badge-accent">Streaming</div>}
                <div className="text-muted text-sm">
                @{username}
            </div>
            </div>


        </a>
    );
};