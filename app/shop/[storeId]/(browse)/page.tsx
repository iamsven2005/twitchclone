"use client"

import { Authenticated, Unauthenticated } from "convex/react"


export default function Shop() {
  return (
  <div>
    <Unauthenticated>
      helo
    </Unauthenticated>
    <Authenticated>
      hello
    </Authenticated>
  </div>

  );
}
