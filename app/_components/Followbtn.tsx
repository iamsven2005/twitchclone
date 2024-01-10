"use client";
import { onFollow, onUnfollow } from "@/lib/follow";
import { useTransition } from "react";
import { toast } from "sonner";
interface FlwbtnProps {
    isFollowing: boolean;
    userId: string;
};
export const Flwbtn = ({
    isFollowing,
    userId,
}: FlwbtnProps) => {
    const [isPending, startTransition] = useTransition();
    const handleFollow = () => {
        startTransition(()=> {
            onFollow(userId)
            .then((data)=> toast.success(`You are now following ${data.following.username}`))
            .catch(()=> toast.error("Something Went Wrong"));
        });
    };
    const handleUnFollow = () => {
        startTransition(()=> {
            onUnfollow(userId)
            .then((data)=> toast.success(`You have followed ${data.following.username}`))
            .catch(()=> toast.error("Something Went Wrong"));
        });
    };
    const onClick = () => {
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow();
        }
    }
    return (
        <button 
        disabled={isPending}
        onClick={onClick} 
        className="btn btn-success">
        {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
  };