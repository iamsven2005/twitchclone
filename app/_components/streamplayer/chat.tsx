"use client"
import { useSidebar } from "../../store/use-chat";
import { useState, useMemo } from "react";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { ChatInfo } from "./chat-info";
import { ChatCommunity } from "./chat-community";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";
import { useChat } from "@livekit/components-react";
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
    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();
  

      const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
      }, [messages]);
    const toggleChatVisibility = () => {
        setIsChatVisible((prevVisibility) => !prevVisibility);
      };
    const onChange = (value: string) => {
        setValue(value);
      };
    const onSubmit = () => {
        if (!send) return;
        send(value);
        setValue("");
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
        <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
          />
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
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </div>
    </div>

    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Chat" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
    </div>

    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
    </div>
    </div>
    </div>
 )   
}