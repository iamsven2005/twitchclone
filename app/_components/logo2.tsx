"use client";

import { useState, useEffect } from 'react';
export const Logo2 = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Check if the window object is defined (client-side)
    if (typeof window !== 'undefined') {
      // Set the initial window width
      setWindowWidth(window.innerWidth);

      // Update window width on resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Remove event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
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
