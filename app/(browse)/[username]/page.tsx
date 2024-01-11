import { getUserByid, getReasonByid } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Flwbtn } from "@/app/_components/Followbtn";
import { isBlockingUser } from "@/lib/block-service";
interface UserPageProps {
    params: {
        username: string;
        blockerId: string;
    };
};
const Userpage = async ({params}: UserPageProps) => {
    const user = await getUserByid(params.username);
    const reason = await getReasonByid(params.blockerId)
    if (!user){
        notFound();
    }
    const isFollowing = await isFollowingUser(user.id)
    const isBlocking = await isBlockingUser(user.id)

    return (    
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">User {user.username}</h1>
      <div className="avatar">
        <div className="w-24 rounded-full">
            <img src={user.imageUrl} />
        </div>
    </div>
      <p className="py-6">Id: {user.id}</p>
      <p className="py-6">Is following: {`${isFollowing}`}</p>
      <Flwbtn isFollowing={isFollowing} userId={user.id} isBlocking={isBlocking}/>
      <p className="py-6">
            {isBlocking ? `You have blocked this user. Reason: ${reason?.blockedReason}` : 'Not blocked'}
        </p>
      <div className="form-control">
        <label className="label cursor-pointer gap-4">
            <span className="label-text">Default</span>
            <input type="radio" name="theme-radios" className="radio theme-controller" value="default"/>
        </label>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer gap-4">
            <span className="label-text">Retro</span>
            <input type="radio" name="theme-radios" className="radio theme-controller" value="retro"/>
        </label>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer gap-4">
            <span className="label-text">Cyberpunk</span>
            <input type="radio" name="theme-radios" className="radio theme-controller" value="cyberpunk"/>
        </label>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer gap-4">
            <span className="label-text">Valentine</span>
            <input type="radio" name="theme-radios" className="radio theme-controller" value="valentine"/>
        </label>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer gap-4">
            <span className="label-text">Aqua</span>
            <input type="radio" name="theme-radios" className="radio theme-controller" value="aqua"/>
        </label>
        </div>
    </div>
  </div>
</div>  
     );
}

export default Userpage;