"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import { onBlock } from "@/lib/block"; 
import { cn, stringToColor } from "@/lib/utils";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
};

export const CommunityItem = ({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const Reason = "Blocked during stream";
  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <div className={cn(
      "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
      isPending && "opacity-50 pointer-events-none"
    )}>
      <p style={{ color: color }}>
        {participantName}
      </p>
      {isHost && !isSelf && (
        <div className="tooltip" data-tip="block">
          <button
            disabled={isPending}
            onClick={handleBlock}
            className="btn btn-ghost">
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};