import {SignInButton, currentUser} from "@clerk/nextjs";

export const Actions = async () => {
    const user =await currentUser();
    return (
        <div className="form-control gap-2">
        {user && (
        <a href={`/u/${user.username}`} className="btn">
            Dashboard
        </a>
        )} 
        </div>
    )
}