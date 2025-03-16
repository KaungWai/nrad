-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "user_id" VARCHAR(36) NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "role" "Role" NOT NULL,
    "hash" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
