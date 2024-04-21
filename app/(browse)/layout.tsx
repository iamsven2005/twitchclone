import {UserButton, currentUser} from "@clerk/nextjs"
import {Logo2} from "../_components/reuse/logo2";
import {Search} from "../_components/reuse/search";
import {Actions} from "../_components/reuse/Actions";
import { Recommends } from "../_components/recommend"; 
import { Container } from "../_components/reuse/Container";
import { getUserByUsername } from "@/lib/user-service";
import Link from "next/link";
interface BrowseLayoutProps {
  children: React.ReactNode;

}

const BrowseLayout = async ({ children }: BrowseLayoutProps) => {
  const params = await currentUser();

  if (!params) {
    return null;
  }

  let self = null;

  if (params.username) {
    self = await getUserByUsername(params.username);
  }
  return(
<div className="drawer">
<input type="checkbox"         
value={self?.theme ?? "default"} 
 className="invisible theme-controller" checked disabled/>
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {
      <div>
      <div className="navbar bg-base-100">
      <a href="/" className="navbar-start">
        <Logo2/>
      </a>
      <div className="navbar-end gap-2">
      <div className="form-control gap-2">
        <Search />
        
      </div>
      <Actions/>
    
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
      <li className="text-primary">For You</li>
      <Recommends/>
      <li className="btn">Your Current Credit: {self?.credit}</li>
      <li><Link href={`/u/${self?.username}/settings`}>
      Using theme: {self?.theme}</Link></li>
    </ul>
  </div>
</div>
    );
};
export default BrowseLayout