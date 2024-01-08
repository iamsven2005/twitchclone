import { Recommended } from "./Recommended";
import { getRecommended } from "@/lib/recommend-service";
export const Recommends = async () => {
    const recommended = await getRecommended();
    return(
        <Recommended data={recommended}/>
    )
}