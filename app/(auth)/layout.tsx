import { Logo } from "../_components/logo";
const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="hero min-h-screen"> 
        <div className="hero-content text-center">
        <div className="max-w-md ">   
        <Logo/>    
        {children}
        </div>
        </div>
        </div> 
     );
}
export default AuthLayout;