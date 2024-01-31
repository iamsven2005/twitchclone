import Link from "next/link";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Thumbnail } from "./thumbnail";
import { Check } from "lucide-react";

interface ResultCardProps {
    data: {
        id: string;
        name: string;
        thumbnailUrl: string | null;
        isLive: boolean;
        updatedAt: Date;
        user: User;
    };
};

export const ResultCard = ({
    data,
}: ResultCardProps) => {
    return (
        <Link href={`/view/${data.user.username}`}>
            <div className="w-full flex gap-x-4">
                <div className="relative h-[9rem] w-[16rem]">
                    <Thumbnail
                        src={data.thumbnailUrl}
                        fallback={data.user.imageUrl}
                        isLive={data.isLive}
                        username={data.user.username}
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                            {data.user.username}
                        </p>
                        <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600">
                            <Check className="h-[10px] w-[10px] text-primary stroke-[4px]" />
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
        </Link>
    );
};
