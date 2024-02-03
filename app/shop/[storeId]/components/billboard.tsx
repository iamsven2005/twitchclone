"use client"
import { Billboard } from "../actions/types";

interface Billboardprops {
Billboard: Billboard[] ;
}
const Billboardcard = ({
Billboard,
}:Billboardprops) => {
  if (!Array.isArray(Billboard)) {
    Billboard = [Billboard];
  }
    return ( 
        <div className="carousel w-full">

        {Billboard.map((route) => (
            <div key={route.id} className="carousel-item w-full ">
              <div style={{backgroundImage: `url(${route.imageUrl})`}} className="rounded-xl hero-content w-full text-center bg-no-repeat"><h1 className="text-5xl font-bold">{route.label}</h1></div>
            </div> 
          ))}     
          </div>
     );
}
 
export default Billboardcard;