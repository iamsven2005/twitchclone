import {db} from "@/lib/db";
import {getSelf} from "@/lib/auth-service";
import { toast } from "sonner";
export const getRecommended = async () => {
    let userId;    
    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }
    let users: any[] = []; 
    if (userId) {
     users = await db.user.findMany({
        where: {
            AND: [{
                NOT: {
                    id: userId,
                },
            },{
                NOT: {
                    followedBy: {
                        some: {
                            followerId: userId,
                        },
                    },
                },
            },],
            NOT: {
                id: userId,
            },
        },
        orderBy: {
            createdAt: "desc"
        },
    })
    } else {
        try{
            users = await db.user.findMany({
                orderBy: {
                    createdAt: "desc"
                },
            });
        } catch {
            return null;
        }

    }

    return users;
};