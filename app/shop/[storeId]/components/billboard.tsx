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
        <div className="carousel w-full p-4 sm-:p-6 rounded-xl overflow-hidden">

        {Billboard.map((route) => (
            <div key={route.id} className="carousel-item w-full ">
              <div style={{backgroundImage: 
                `url(${route.imageUrl})`}} 
                className="rounded-xl relative aspect-square md:aspect-[2.4]/1 overflow-hidden bg-cover">
                  <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                  {route.label}</h1></div>
            </div> 
          ))}     
          </div>
     );
}
 
export default Billboardcard;