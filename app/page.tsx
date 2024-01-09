import {UserButton, currentUser} from "@clerk/nextjs"
import {Logo2} from "./_components/logo2";
import {Search} from "./_components/search";
import {Actions} from "./_components/Actions";
import { Recommends } from "./_components/recommend"; 
export default function Home(){
  return (

<div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {
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
    }
    <label htmlFor="my-drawer" className="btn btn-circle toast toast-start toast-middle">&rarr;</label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li className="text-primary">For You</li>
      <Recommends/>
    </ul>
  </div>
</div>



  )

}
