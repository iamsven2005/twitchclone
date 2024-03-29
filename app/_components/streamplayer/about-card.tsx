"use client";

import { Check } from "lucide-react";
import { BioModal } from "./bio-modal";
import StoreSwitcher from "../ecommerce/view-store";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
  items: Record<string, any>[];
};

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
  items,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600">
            <Check className="h-[10px] w-[10px] text-primary stroke-[4px]" />
            </div>
          </div>
          {isHost && (
            <BioModal initialValue={bio} />
          )}
        </div>
        <StoreSwitcher User={hostName} items={items} />

        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">
            {followedByCount}
          </span> {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "This user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  );
};