"use client";
import { Follow, User } from "@prisma/client";
import { UserItem } from "./user-item";
interface FollowingProps {
    data: (Follow & { 
        following: User & {
        stream: { isLive:boolean} | null;
    }})[];
}
export const Following = ( {
    data,
}: FollowingProps) => {
    if(!data.length){
        return null;
    }
    return(
        <li>
        <p className="stat-title">Following</p>
        {data.map((follow) => (
            //set values here (live)
            <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
            /> 
        ))}
        </li>
    );
};
