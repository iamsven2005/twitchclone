import { Recommended } from "./Recommended";
import { getRecommended } from "@/lib/recommend-service";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following } from "./Users/following";
export const Recommends = async () => {
    const recommended = await getRecommended();
    const following = await getFollowedUsers();

    return(
        <div>
            <Recommended data={recommended}/>
            <Following data={following}/>

        </div>
    )
}