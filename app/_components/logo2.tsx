"use client";
import { useState, useEffect } from 'react';
export const Logo2 = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);    
    return (
        <div>
        {windowWidth < 640 ? (
          <div style={{ display: 'none' }}> </div>
        ) : (
        <div>
        <div id="logo" className="btn btn-ghost text-xl">SHAPER</div>
        </div>
                )}
      </div>

        
    )
}