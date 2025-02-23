-- CreateTable
CREATE TABLE "Category" (
    "category_id" VARCHAR(36) NOT NULL,
    "category_name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);
