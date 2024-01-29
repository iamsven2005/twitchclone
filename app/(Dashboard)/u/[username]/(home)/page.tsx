import { currentUser } from "@clerk/nextjs";

import { getUserByUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/app/_components/streamplayer/stream-player";

interface CreatorPageProps {
  params: {
    username: string;
  };
};

const CreatorPage = async ({
  params,
}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return ( 
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing
        isBlocking={false}
      />
    </div>
  );
}
 
export default CreatorPage;