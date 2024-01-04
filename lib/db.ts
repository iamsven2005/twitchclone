import { PrismaClient } from '@prisma/client'
//import { withAccelerate } from '@prisma/extension-accelerate'

//const prisma = new PrismaClient().$extends(withAccelerate())
declare global {
    var prisma: PrismaClient | undefined;
}
export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;