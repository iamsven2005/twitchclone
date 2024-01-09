"use server";
import { followUser } from "./follow-service";
export const onFollow = async (id: string) => {
    try{
        console.log("we ended here")
    }catch (error){
        throw new Error("Internal Error");
    };
};