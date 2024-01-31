import { getUserByUsername } from "@/lib/user-service";
import { notFound, redirect } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
// import { Flwbtn } from "@/app/_components/Users/Followbtn";
import { isBlockingByUser, isBlockingUser } from "@/lib/block-service";
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
  const isBlocking = await isBlockingByUser(user.id);

  if (isBlocking) {
 notFound();
  } else {
    return (
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
        isBlocking={isBlocking}
      />
    );
  }


}

export default UserPage;