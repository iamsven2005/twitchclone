"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client"
import {LiveKitRoom} from "@livekit/components-react"
import { Video } from "./Video";
import { useSidebar } from "../../store/use-chat";
import { Chat } from "./chat";
interface StreamPlayerProps {
    user: User & { stream: Stream | null};
    stream: Stream;
    isFollowing: boolean;
    data:(User & {stream: {isLive: boolean} | null;})[] | null;

}
export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
    data,
}:StreamPlayerProps) => {
    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);
    const { collapsed} = useSidebar((state) => state);
    if (!token || !name || !identity){
        return (
            <div>
                Stream is loading...
            </div>
        )
    }
    return (
        <div>
            <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_WS_URL}
            className="hero bg-base-200 join join-vertical lg:join-horizontal"
            >

            <Video
            hostName={user.username}
            hostIdentity={user.id}/>
            <Chat
            data={data}
            isFollowing={isFollowing}
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
            />

            </LiveKitRoom>

        </div>

    )
}