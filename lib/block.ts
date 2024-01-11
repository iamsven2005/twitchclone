"use server";
import { BlockUser, unBlockUser } from "./block-service";
import { revalidatePath } from "next/cache";
export const onBlock = async (id: string, result: string) => {
    try{
        const reason = result;
        const BlockedUser = await BlockUser(id, reason);
        revalidatePath("/");
        if (BlockedUser){
            revalidatePath(`/${BlockedUser.blocked.username}`);
        }
        return BlockedUser;
    }catch (error){
        throw new Error("Error at BlockUser");
    };
};
export const onUnBlock = async (id: string) => {
    try {
        const unBlockedUser = await unBlockUser(id);
        revalidatePath("/");

        if (unBlockedUser) {
            revalidatePath(`/${unBlockedUser?.blocked.username}`);
        }

        return unBlockedUser;
    } catch (error) {
        if (error instanceof Error && error.message === "Not Blocking") {
            console.warn("User is not currently blocking this user");
            return null; // or handle it in a way that suits your application logic
        } else {
            console.error(error); // Log the unknown error for debugging
        }
    }
};
