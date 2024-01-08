"use client";
import { User } from "@prisma/client";
import { UserItem } from "./user-item";
interface RecommendedProps {
data:User[];
};
export const Recommended = ({
    data, 
}: RecommendedProps) => {
const showLabel = data.length > 0;
    return (
        <li>
        {showLabel && (<p className="stat-title">Recommended</p>)}
        {data.map((User) => (
            //set values here (live)
            <UserItem 
            key={User.id} 
            username={User.username} 
            imageUrl={User.imageUrl} 
            isLive={false}/>
        ))}
        </li>
    );
};