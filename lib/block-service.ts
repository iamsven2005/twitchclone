import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
export const getBlockedUsers = async () => {
    try {
        const self = await getSelf();
        const BlockedUsers = db.block.findMany({
            where:{
                blockerId: self.id,
            },
            include:{
                blocked: true,
            },
        });
        return BlockedUsers;
    }catch {
        return [];
    }
}
export const isBlockingUser = async (id: string) => {
    try{
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: {id},
        });
        if (!otherUser) {
            throw new Error("User not found");
        }
        if (otherUser.id === self.id){
            return true;
        }
        const existingBlock = await db.block.findFirst({
            where: {
                blockerId: self.id,
                blockedId: otherUser.id,
            },
        });
        return !!existingBlock
    } catch {
        return false;
    }
};
export const BlockUser = async (id: string, reason: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: {id},
    });
    if (!otherUser) {
        throw new Error("User Not Found")
    }
    if (otherUser.id === self.id){
        throw new Error("Cannot Block Your Self")
    }
    const existingBlock = await db.block.findFirst({
        where:{
            blockerId: self.id,
            blockedId: otherUser.id,

        },
    });

    if (existingBlock) {
        throw new Error("Already Blocking");
    }
    const Block = await db.block.create({
        data:{
            blockerId: self.id,
            blockedId: otherUser.id,
            blockedReason: reason,
        },
        include:{
            blocked: true,
            blocker: true,
        },
    });
    return Block
};
export const unBlockUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where:{
            id,
        },
    });
    if (!otherUser){
        throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
        throw new Error("Cannot unBlock yourself");
    }
    const existingBlock = await db.block.findFirst({
        where:{
            blockerId: self.id,
            blockedId: otherUser.id,
        },
    });
    if (!existingBlock) {
        throw new Error("Not Blocking");
    }
    const Block = await db.block.delete({
        where:{
            id: existingBlock.id,
        },
        include: {
            blocked: true,
        },
    });
    return Block;
};