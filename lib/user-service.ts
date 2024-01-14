import { db } from "@/lib/db";
export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
            
        },
        include:{
            stream: true,
        }
    });
    return user;
};
export const getUserByid = async (id: string) => {
    const user = await db.user.findUnique({
        where: {id},
        include:{
            stream: true,
        },
    });
    return user;
};
export const getReasonByid = async (blockerId: string) => {
    const reason = await db.block.findFirst({
        where: {
            blockerId,
        },
    });
    return reason;
};
