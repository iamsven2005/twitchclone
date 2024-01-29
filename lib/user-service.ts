import { db } from "@/lib/db";
export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        externalUserId: true,
        username: true,
        bio: true,
        imageUrl: true,
        stream: {
          select: {
            id: true,
            isLive: true,
            isChatDelayed: true,
            isChatEnabled: true,
            isChatFollowersOnly: true,
            thumbnailUrl: true,
            name: true,
          },
        },
        _count: {
          select: {
            followedBy: true,
          },
        },
      },
    });
  
    return user || null;
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
export const SeeMessage = async (roomid: string) => {
    const reason = await db.message.findMany({
        where: {
            roomid,
        },
    });
    return reason;
};
export const PostMessage = async (roomid: string, time: string, message: string, name: string ) => {
    const reason = await db.message.create({
        data:{
            roomid,
            message,
            time,
            name,
        }
    });
    return reason;
};

