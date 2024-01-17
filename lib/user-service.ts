import { db } from "@/lib/db";
export const getUserByUsername = async (username: string | null) => {
    if (username == null){
        return null;
    }
    const user = await db.user.findUnique({
        where: {
            username,
            
        },
        include:{
            stream: true,
        }
    });
    return user || null; // Return null explicitly if user is not found
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
