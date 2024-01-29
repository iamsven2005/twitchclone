import Link from "next/link";
import { Stream, User } from "@prisma/client";
import { UserAvatar } from "../streamplayer/user-avatar";
import { Thumbnail } from "./thumbnail"; 
interface ResultCardProps {
  data: {
    user: User,
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
};

export const ResultCard = ({
  data,
}: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="card w-90 bg-base-100 shadow-xl">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className="card-body">
            <div className="card-title"> 
            <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}/>
            <p className="truncate card-title hover:text-blue-500">
              {data.name}
            </p>
            </div>
            <p className="text-muted-foreground">
              {data.user.username}
            </p>
          </div>
        </div>
    </Link>
  );
};
