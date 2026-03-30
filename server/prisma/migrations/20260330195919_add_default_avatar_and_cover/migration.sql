/*
  Warnings:

  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cover` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT '/images/default-avatar.png',
ALTER COLUMN "cover" SET NOT NULL,
ALTER COLUMN "cover" SET DEFAULT '/images/default-cover.jpg';
