/*
  Warnings:

  - You are about to drop the column `isPostAuthor` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPostAuthor",
ADD COLUMN     "isWriter" BOOLEAN NOT NULL DEFAULT false;
