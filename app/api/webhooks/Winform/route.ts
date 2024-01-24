import { db } from "@/lib/db";

export async function POST(req: Request) {
    const user = await db.user.count();
    return new Response(`${user}`, { status: 200 })
}

