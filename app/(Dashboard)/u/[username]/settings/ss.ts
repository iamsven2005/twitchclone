"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
export const updatetheme = async (values: string) => {
    try{
        const self = await getSelf();
        const stream = await db.user.update({
            where:{
                id: self.id,
            },
            data: {
                theme: values,
            },
        });
        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/view/${self.username}`)
        return stream;
    } catch {
        throw new Error("Error at theme update")
    }
}