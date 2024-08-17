/*
  Warnings:

  - Added the required column `original_key` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_key` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image" ADD COLUMN     "original_key" TEXT NOT NULL,
ADD COLUMN     "thumbnail_key" TEXT NOT NULL;
