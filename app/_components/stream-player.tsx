"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client"
import {LiveKitRoom} from "@livekit/components-react"
import { Video } from "./Video";
interface StreamPlayerProps {
    user: User & { stream: Stream | null};
    stream: Stream;
    isFollowing: boolean
}
export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}:StreamPlayerProps) => {
    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);
    console.log({token, name, identity})
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
            className="hero bg-base-200"
            >
            <Video
            hostName={user.username}
            hostIdentity={user.id}
            
            />
            </LiveKitRoom>
        </div>
    )
}