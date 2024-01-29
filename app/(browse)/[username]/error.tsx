"use client";

import Link from "next/link";
const ErrorPage = () => {
  return ( 
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p>
        Something went wrong
      </p>
      <button className="btn">
        <Link href="/">
          Go back home
        </Link>
      </button>
    </div>
  );
};
 
export default ErrorPage;