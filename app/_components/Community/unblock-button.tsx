"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { onUnblock } from "@/lib/block";
interface UnblockButtonProps {
  userId: string;
};

export const UnblockButton = ({
  userId,
}: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => toast.success(`User ${result.blocked.username} unblocked`))
        .catch(() => toast.error("Something went wrong"))
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={onClick}
      className="btn btn-link text-blue-500 w-full"
    >
      Unblock
    </button>
  )
}