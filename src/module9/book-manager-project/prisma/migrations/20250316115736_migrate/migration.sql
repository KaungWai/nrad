-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Category" (
    "category_id" VARCHAR(36) NOT NULL,
    "category_name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Author" (
    "author_id" VARCHAR(36) NOT NULL,
    "author_name" VARCHAR(200) NOT NULL,
    "gender" "Gender" NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("author_id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "publisher_id" VARCHAR(36) NOT NULL,
    "publisher_name" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("publisher_id")
);

-- CreateTable
CREATE TABLE "Book" (
    "book_id" VARCHAR(36) NOT NULL,
    "book_name" VARCHAR(200) NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL,
    "category_id" VARCHAR(36) NOT NULL,
    "author_id" VARCHAR(36) NOT NULL,
    "publisher_id" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("author_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "Publisher"("publisher_id") ON DELETE RESTRICT ON UPDATE CASCADE;
