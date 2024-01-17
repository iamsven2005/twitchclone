"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
};

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  }

  // if (isHidden) {
  //   return null;
  // }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">

        <input
        type="text"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "input border-white/10",
            (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isDisabled}
        >
          Chat
        </button>
      </div>
    </form>
  );
};
