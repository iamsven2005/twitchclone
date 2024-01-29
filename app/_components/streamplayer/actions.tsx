"use client";

import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/lib/follow"

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
};

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    });
  }

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"))
    });
  }

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  return (
    <button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      className="btn btn-primary"
    >
      <Heart className={cn(
        "h-4 w-4 mr-2",
        isFollowing
          ? "fill-white"
          : "fill-none"
      )} />
      {isFollowing
        ? "Unfollow"
        : "Follow"
      }
    </button>
  )
};