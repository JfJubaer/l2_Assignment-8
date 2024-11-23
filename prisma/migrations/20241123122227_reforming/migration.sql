/*
  Warnings:

  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderedBooks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews_and_ratings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "orderedBooks" DROP CONSTRAINT "orderedBooks_bookId_fkey";

-- DropForeignKey
ALTER TABLE "orderedBooks" DROP CONSTRAINT "orderedBooks_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews_and_ratings" DROP CONSTRAINT "reviews_and_ratings_bookId_fkey";

-- DropForeignKey
ALTER TABLE "reviews_and_ratings" DROP CONSTRAINT "reviews_and_ratings_userId_fkey";

-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "orderedBooks";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "reviews_and_ratings";
