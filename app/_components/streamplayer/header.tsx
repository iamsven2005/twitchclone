"use client";

import { UserIcon, Check } from "lucide-react";
import { 
  useParticipants, 
  useRemoteParticipant
} from "@livekit/components-react";

import { UserAvatar } from "./user-avatar";
import { Flwbtn } from "../Users/Followbtn";
interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  isBlocking: boolean;
  name: string;
};

export const Header = ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  isBlocking,
  name,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">
              {hostName}
            </h2>
            <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600">
            <Check className="h-[10px] w-[10px] text-primary stroke-[4px]" />
            </div>          
            </div>
          <p className="text-sm font-semibold">
            {name}
          </p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500"> 
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>
      <Flwbtn
        isBlocking={isBlocking}
        isFollowing={isFollowing}
        userId={hostIdentity}
      />
    </div>
  );
};
