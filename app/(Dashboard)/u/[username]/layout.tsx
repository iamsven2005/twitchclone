import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import {UserButton, } from "@clerk/nextjs"
import {Search} from "@/app/_components/reuse/search";
import {CreateActions, Logo3, CreateBar} from "@/app/_components/CreatorActions"
import { Container } from "@/app/_components/reuse/Container";
interface CreatorLayoutProps {
    params: { username:string};
    children: React.ReactNode;
};
const CreatorLayout = async({
    params,
    children,
}: CreatorLayoutProps) => {
    const self = await getSelfByUsername(params.username);
    if(!self) {
        redirect("/")
    }
    return ( 

<div className="drawer">
<input type="checkbox" 
        value={self?.theme ?? "default"} // Use nullish coalescing operator
        className="invisible theme-controller" checked disabled/>
  <input id="my-drawer" type="checkbox" className="drawer-toggle"  />
  <div className="drawer-content">
    {
      <div>
      <div className="navbar bg-base-100">
      <a href="/" className="navbar-start">
        <Logo3/>
      </a>
      <div className="navbar-end gap-2">
      <div className="form-control gap-2">
        <Search />
      </div>
      <CreateActions/>
    
      <UserButton afterSignOutUrl="/"/>
    
      </div>
      </div>
      <Container>
        {children}
      </Container>
    </div>
    }
    <label htmlFor="my-drawer" className="btn btn-circle toast toast-start toast-middle">&rarr;</label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
        <CreateBar/>
    </ul>
  </div>
</div>

     );
}
 
export default CreatorLayout;