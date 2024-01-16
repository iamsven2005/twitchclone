import { Info } from "lucide-react";
import { useMemo } from "react";

interface InfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
};
export const ChatInfo = ({
    isDelayed,
    isFollowersOnly,
    }: InfoProps) =>  {
const hint = useMemo(()=> {
    if (isFollowersOnly && !isDelayed) {
        return "Only Followers can chat"
    }
    if (isDelayed && !isFollowersOnly) {
        return "Messages are delayed b y 3 seconds"
    }
    if (isDelayed && isFollowersOnly) {
        return "Only followers can chat, messages are delayed b y 3 seconds"
    }
    return "";
}, [isDelayed, isFollowersOnly])
const label = useMemo(()=> {
    if (isFollowersOnly && !isDelayed) {
        return "Followers only"
    }
    if (isDelayed && !isFollowersOnly) {
        return "Slow mode"
    }
    if (isDelayed && isFollowersOnly) {
        return "Chat slowed, slow mode enabled."
    }
    return "";
}, [isDelayed, isFollowersOnly])
if (!isDelayed && !isFollowersOnly) {
    return null;
};
        return(
<div className="tooltip card-title" data-tip={hint}>
  <button className="btn"><Info />{label}</button>
</div>

        );
    };