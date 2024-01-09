"use server";
import { followUser } from "./follow-service";
export const onFollow = async (id: string) => {
    try{
        const followedUser = await followUser(id);
    }catch (error){
        throw new Error("Internal Error");
    };
};