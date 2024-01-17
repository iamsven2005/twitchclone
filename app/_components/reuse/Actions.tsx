import {SignInButton, currentUser} from "@clerk/nextjs";

export const Actions = async () => {
    const user = await currentUser();
    return (
        <div className="form-control gap-2">
            {!user && (
                <SignInButton><button className="g-recaptcha btn" 
                data-sitekey="6Lcua1MpAAAAAKKmBUx3A_JDXWPt7lP1_Tb1c3ka" 
                data-callback='onSubmit' 
                data-action='submit'>Sign In</button></SignInButton>
            )}
        {user && (
        <a href={`/u/${user.username}`} className="btn">
            Dashboard
        </a>
        )} 
        </div>
    )
}