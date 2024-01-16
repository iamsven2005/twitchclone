"use server";
import { followUser, unfollowUser } from "./follow-service";
import { revalidatePath } from "next/cache";
export const onFollow = async (id: string) => {
    try{
        const followedUser = await followUser(id);
        revalidatePath("/");
        if (followedUser){
            revalidatePath(`/${followedUser.following.username}`);
        }
        return followedUser;
    }catch (error){
        throw new Error("Error at followUser");
    };
};
export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);
        revalidatePath("/")

        if(unfollowedUser) {
            revalidatePath(`/${unfollowedUser?.following.username}`)
        }
        return unfollowedUser;
    }catch (error) {
        throw new Error("Error at Follow.ts")
    }
}
