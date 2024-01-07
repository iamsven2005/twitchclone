import {SignInButton, currentUser} from "@clerk/nextjs";

export const Actions = async () => {
    const user =await currentUser();
    return (
        <div className="form-control gap-2">
        <button href={`/u/${user.username}`} className="btn">Dashboard</button>
        </div>
    )
}