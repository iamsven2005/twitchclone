import { auth, currentUser } from "@clerk/nextjs";

import { getUserByUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/app/_components/streamplayer/stream-player";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface CreatorPageProps {
  params: {
    username: string;
  };
  items: any
};

const CreatorPage = async ({
  params,
  items,
}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }
  const stores = await db.store.findMany({
    where: {
      userId,
    }
  });
  if(!stores){
    return null;
  }
  return ( 
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
        isBlocking={false}
        items={items}
      />
    </div>
  );
}
 
export default CreatorPage;