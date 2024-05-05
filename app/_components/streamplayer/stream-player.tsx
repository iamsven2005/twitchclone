"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client"
import {LiveKitRoom} from "@livekit/components-react"
import { Video } from "./Video";
import { useSidebar } from "../../store/use-chat";
import { Chat } from "./chat";
import { Header } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";
type CustomStream = {
    id: string;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    isLive: boolean;
    thumbnailUrl: string | null;
    name: string;

  };
  
  type CustomUser = {
    id: string;
    username: string;
    bio: string | null;
    stream: CustomStream | null;
    imageUrl: string;
    _count: { followedBy: number, following: number }
    credit: number | null
    createdAt: Date
  };
  interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream;
    isFollowing: boolean;
    isBlocking: boolean;
    items: Record<string, any>[];

  }
export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
    isBlocking,
    items,
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
    let creds = user.credit; 

    if (creds == null) {  
      creds = 0;
    }
    return (
        <div className="flex container flex-col">
            <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_WS_URL}
            className="hero bg-base-200 join join-vertical"
            >
            
            <Video
            hostName={user.username}
            hostIdentity={user.id}/>
            {!isBlocking && (
              <Chat
                isFollowing={isFollowing}
                viewerName={name}
                hostName={user.username}
                hostIdentity={user.id}
                isChatEnabled={stream.isChatEnabled || isBlocking}
                isChatDelayed={stream.isChatDelayed}
                isChatFollowersOnly={stream.isChatFollowersOnly}
              />
            )}
            
            <Header
                hostName={user.username}
                hostIdentity={user.id}
                viewerIdentity={identity}
                imageUrl={user.imageUrl}
                isFollowing={isFollowing}
                name={stream.name}
                isBlocking={isBlocking}
            />
            <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            items={items}
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
            followingCount={user._count.following}
            credit={creds}
            created={user.createdAt.toUTCString()}

          />
          <div>
          </div>
            </LiveKitRoom>
        </div>

    )
}