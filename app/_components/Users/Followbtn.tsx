"use client";
import { onBlock, onUnblock } from "@/lib/block";
import { onFollow, onUnfollow } from "@/lib/follow";
import { useTransition, useState } from "react";
import { toast } from "sonner";

interface FlwbtnProps {
    isFollowing: boolean;
    isBlocking: boolean;
    userId: string;
}

export const Flwbtn = ({
    isFollowing,
    isBlocking,
    userId,
}: FlwbtnProps) => {
    const [isPending, startTransition] = useTransition();
    const [blockReason, setBlockReason] = useState('');

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something Went Wrong"));
        });
    };

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something Went Wrong"));
        });
    };

    const onfollow = () => {
        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    };

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`You are now Blocking ${data?.blocked.username}`))
                .catch(() => toast.error("Something Went Wrong"));
        });
    };

    const handleUnBlock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => {
                    if (data && data.blocked && data.blocked.username) {
                        toast.success(`You have unBlocked ${data.blocked.username}`);
                    } else {
                        toast.error("Something Went Wrong");
                    }
                })
                .catch(() => toast.error("Something Went Wrong"));
        });
    };

    const onblock = () => {
        if (isBlocking) {
            handleUnBlock();
        } else {
            handleBlock();
        }
    };
    

    return (
        <div className="flex gap-2  join join-vertical lg:join-horizontal">
        <button
        disabled={isPending}
        onClick={onfollow} 
        className={!isFollowing ? "btn btn-success join-item" : "btn btn-info join-item "}>
        {isFollowing ? "Unfollow" : "Follow"}
        </button>
        <button
        disabled={isPending}
        onClick={onblock}
        className={!isBlocking ? "btn btn-success join-item" : "btn btn-error join-item "}
        >
        {isBlocking ? "Unblock" : "Block"}
        </button>

        </div>
    );
  };