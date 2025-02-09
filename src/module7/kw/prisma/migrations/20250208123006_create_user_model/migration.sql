-- CreateTable
CREATE TABLE "User" (
    "user_id" VARCHAR(36) NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "user_email" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
