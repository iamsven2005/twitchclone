import { getUserByUsername } from "@/lib/user-service";
import { notFound, redirect } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
// import { Flwbtn } from "@/app/_components/Users/Followbtn";
import { isBlockingUser } from "@/lib/block-service";
import { StreamPlayer } from "@/app/_components/streamplayer/stream-player";
import { toast } from "sonner";
interface UserPageProps {
  params: {
    username: string;
    blockerId: string;
  };
};
const UserPage = async ({
  params
}: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockingUser(user.id);

  if (isBlocked) {
    return (
      <div>
        You have been blocked
      </div>
    );
  } else {
    return (
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
        isBlocking={isBlocked}
      />
    );
  }


}

export default UserPage;