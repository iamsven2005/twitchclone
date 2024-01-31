"use client";

import Link from "next/link";
const ErrorPage = () => {
  return ( 
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Error</h1>
      <p>
        Something went wrong
      </p>
      <button className="btn">
        <Link href="/">
          Go back home
        </Link>
      </button>
    </div>
  </div>
</div>      
  );
};
 
export default ErrorPage;