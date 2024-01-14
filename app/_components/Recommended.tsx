"use client";
import { User } from "@prisma/client";
import { UserItem } from "./user-item";
interface RecommendedProps {
data:User[] | null;
};
export const Recommended = ({
    data, 
}: RecommendedProps) => {
    const showLabel = data && data.length > 0;
    if(data === null){
        alert("Connection error, please turn off your vpn");
    }
    return (
        <li>
            {showLabel ? (
                <p className="stat-title">Recommended</p>
            ) : (
                <div>
                    <p className="stat-title">Recommended</p>
                </div>
            )}

            {data && data.map((User) => (
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