"use client"
import { useSidebar } from "../../store/use-chat";
import { useState } from "react";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { ChatInfo } from "./chat-info";
import ChatSection from "./Chatsection";
import { ChatCommmunity } from "./chat-community";
interface ChatProps {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
};
export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
}: ChatProps) => {
    const {collapsed, varient, onExpand, onCollapse} = useSidebar((state)=> state)
    const isHidden = !isChatEnabled;
    const [isChatVisible, setIsChatVisible] = useState(true); // Initial visibility
    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine
    const label = collapsed ? "Expand" : "Hide";


    const toggleChatVisibility = () => {
        setIsChatVisible((prevVisibility) => !prevVisibility);
      };
    return(
    <div className="join-item relative p-3 border-b" >
    <div className="tooltip" data-tip={label}>
    <button className="btn btn-ghost"onClick={toggleChatVisibility}>
        <Icon className="h-4 w-4"/>Chat</button>
    </div>
    <div id="chat"className={`font-semibold text-primary text-center ${isChatVisible ? "" : "hidden"}`}>
    <div role="tablist" className="tabs tabs-lifted">
    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Message" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 card">
        <div className="card-body">
        <ChatInfo
            isDelayed={isChatDelayed}
            isFollowersOnly={isChatFollowersOnly}
            />
        <ChatSection
                hostIdentity={hostIdentity}
                viewerName={viewerName}
                hostName={hostName}
                isHidden={isHidden}
                isFollowersOnly={isChatFollowersOnly}
                isFollowing={isFollowing}
                isDelayed={isChatDelayed}
        />
        </div>
    </div>

    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Chat" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

    </div>

    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
    </div>
    </div>
    </div>
 )   
}