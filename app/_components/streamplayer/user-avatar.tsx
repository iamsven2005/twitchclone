import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarSizes = cva(
  "",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface UserAvatarProps
  extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
};

export const UserAvatar = ({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="avatar">
      <div className="w-10 rounded-full">
        <img src={imageUrl} />
      </div>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <div className={cn(
                "bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold tracking-wide",
                )}>
                Live
                </div>
        </div>
      )}
    </div>
  );
};
