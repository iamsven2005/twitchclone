import { UserButton } from "@clerk/nextjs"
import {Logo2} from "./_components/logo2";
import {Search} from "./_components/search";
import {Actions} from "./_components/Actions";
export default function Home(){
  return (
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




  )

}
