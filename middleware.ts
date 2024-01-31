import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: 

  ["/Shop",
  "/sign-in",
  "/sign-up",
  "/api/:path*",
]
});//unprotect
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  runtime: 'experimental-edge',
  unstable_allowDynamic: [
    '/node_modules/scheduler/cjs/scheduler.production.min.js',
    '/node_modules/function-bind/**',
    '/node_modules/@clerk/shared/dist/chunk-RSOCGYTF.mjs'
  ],
};
 