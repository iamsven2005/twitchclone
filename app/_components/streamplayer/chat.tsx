"use client"
import {useMediaQuery} from "usehooks-ts"
import { useSidebar } from "../../store/use-chat";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { ChatForm } from "./chatform";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { ChatInfo } from "./chat-info";
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
    const matches = useMediaQuery('(max-width: 1024px)');
    const {collapsed, varient, onExpand, onCollapse} = useSidebar((state)=> state)
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const isOnline = participant && connectionState === ConnectionState.Connected
    const isHidden = !isChatEnabled || !isOnline;
    const [value, setValue] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(true); // Initial visibility
    const {chatMessages: messages, send} = useChat();
    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine
    const label = collapsed ? "Expand" : "Hide";
    useEffect(()=>{
        if (matches){
            onExpand();
        }
    },[matches, onExpand])
    const reversedMessages = useMemo(()=> {
        return messages.sort((a,b)=> b.timestamp - a.timestamp);
    }, [messages]);
    const onSubmit = () => {
        if(!send) return;
        send(value);
        setValue("");
    };
    const onChange = (value:string) => {
        setValue(value);
    }
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

        <ChatForm
        onSubmit={onSubmit}
        value={value}
        onChange={onChange}
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