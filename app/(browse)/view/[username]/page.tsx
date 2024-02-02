import { getUserByUsername } from "@/lib/user-service";
import { notFound, redirect } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
// import { Flwbtn } from "@/app/_components/Users/Followbtn";
import { isBlockingByUser, isBlockingUser } from "@/lib/block-service";
import { StreamPlayer } from "@/app/_components/streamplayer/stream-player";
import { db } from "@/lib/db";
import StoreSwitcher from "@/app/_components/ecommerce/view-store";
import { auth } from "@clerk/nextjs";
interface UserPageProps {
  params: {
    username: string;
    blockerId: string;
  };
};
const UserPage = async ({
  params
}: UserPageProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }
  const stores = await db.store.findMany({
    where: {
      userId,
    }
  });
  if(!stores){
    return null;
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockingByUser(user.id);

  if (isBlocking) {
 notFound();
  } else {

    return (
      <div className="join join-vertical">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
        isBlocking={isBlocking}
        items={stores}
      />

      </div>

      );
  }


}

export default UserPage;