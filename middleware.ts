import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  runtime: 'experimental-edge',
  unstable_allowDynamic: [
    '/node_modules/scheduler/cjs/scheduler.production.min.js',
    '/node_modules/function-bind/**',
    '/node_modules/@clerk/shared/dist/chunk-RSOCGYTF.mjs'
  ],
};
 