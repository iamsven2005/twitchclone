import { getUserByUsername} from "@/lib/user-service";
import {currentUser} from "@clerk/nextjs";
import { StreamPlayer } from "@/app/_components/streamplayer/stream-player";
interface CreatorPageProps {
    params:{
        username: string;
    };
};

const Creator = async({
    params,
}: CreatorPageProps) => {
    const externalUser = await currentUser();
    const user = await getUserByUsername(params.username);
    if (!user || user.externalUserId !== externalUser?.id || !user.stream){
        throw new Error("Unauthorized")
    }
    return ( 
        <div>
            <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing/>
        </div>
     );
}
 
export default Creator;