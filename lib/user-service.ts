import { db } from "@/lib/db";
export const getUserByid = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
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