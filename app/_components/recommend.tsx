import { Recommended } from "./Recommended";
import { getRecommended } from "@/lib/recommend-service";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following } from "./following";
export const Recommends = async () => {
    let recommended = await getRecommended();
    if (getRecommended === null) {
        recommended = ["NETWORK ISSUE"]
    }
    const following = await getFollowedUsers();
    return(
        <div>
            <Recommended data={recommended}/>
            <Following data={following}/>

        </div>
    )
}