NEXTJS 14
CLERK PRISMA PLANETSCALE

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User{
  id String @id @default(uuid())
  username String @unique
  imageUrl String 
  externalUserId String @unique
  bio String? 

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
