import Link from "next/link";

const NotFoundPage = () => {
  return ( 
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-4xl">404</h1>
      <p>
        We couldn&apos;t find the user you were looking for.
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
 
export default NotFoundPage;