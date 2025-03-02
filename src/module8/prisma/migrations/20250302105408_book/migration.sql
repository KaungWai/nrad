/*
  Warnings:

  - Added the required column `book_name` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "book_name" VARCHAR(200) NOT NULL;
