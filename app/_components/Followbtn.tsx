"use client";
import { onBlock, onUnBlock } from "@/lib/block";
import { onFollow, onUnfollow } from "@/lib/follow";
import { useTransition, useState } from "react";
import { toast } from "sonner";
interface FlwbtnProps {
    isFollowing: boolean;
    isBlocking: boolean;
    userId: string;
};
export const Flwbtn = ({
    isFollowing,
    isBlocking,
    userId,
}: FlwbtnProps) => {
    const [isPending, startTransition] = useTransition();
    const [blockReason, setBlockReason] = useState('');


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
            .then((data)=> toast.success(`You have unfollowed ${data.following.username}`))
            .catch(()=> toast.error("Something Went Wrong"));
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
        startTransition(()=> {
            onBlock(userId, blockReason)
            .then((data)=> toast.success(`You are now Blocking ${data.blocked.username}`))
            .catch(()=> toast.error("Something Went Wrong"));
        });
    };
    const handleUnBlock = () => {
        startTransition(() => {
            onUnBlock(userId)
                .then((data) => {
                    if (data?.blocked?.username) {
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
    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Textbox value:', event.target.value);
        setBlockReason(event.target.value);
    };
    

    return (
        <div>
        <button
        disabled={isPending}
        onClick={onfollow} 
        className="btn btn-success">
        {isFollowing ? "Unfollow" : "Follow"}
        </button>
        <button
        disabled={isPending}
        onClick={onblock}
        className="btn btn-success">
        {isBlocking ? "Unblock" : "Block"}
        </button>
        {!isBlocking && (
        <input 
        type="text" 
        placeholder="Reason" 
        className="input input-ghost"
        value={blockReason}
        onChange={handleReasonChange}
        ></input>
        )}

        </div>
    );
  };