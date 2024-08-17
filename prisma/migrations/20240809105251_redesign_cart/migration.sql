/*
  Warnings:

  - You are about to drop the column `total_price` on the `cart` table. All the data in the column will be lost.
  - The `defaultPrice` column on the `creator_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `cart_image` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `price` on the `image` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "cart_image" DROP CONSTRAINT "cart_image_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_image" DROP CONSTRAINT "cart_image_image_id_fkey";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "total_price";

-- AlterTable
ALTER TABLE "creator_data" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'AUD',
DROP COLUMN "defaultPrice",
ADD COLUMN     "defaultPrice" DECIMAL(65,30) NOT NULL DEFAULT 15;

-- AlterTable
ALTER TABLE "image" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'AUD',
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "cart_image";

-- CreateTable
CREATE TABLE "cart_project_image" (
    "id" TEXT NOT NULL,
    "cart_project_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_project_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_project" (
    "id" TEXT NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "cart_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_project_image_cart_project_id_image_id_key" ON "cart_project_image"("cart_project_id", "image_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_project_cart_id_project_id_key" ON "cart_project"("cart_id", "project_id");

-- AddForeignKey
ALTER TABLE "cart_project_image" ADD CONSTRAINT "cart_project_image_cart_project_id_fkey" FOREIGN KEY ("cart_project_id") REFERENCES "cart_project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_project_image" ADD CONSTRAINT "cart_project_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_project" ADD CONSTRAINT "cart_project_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_project" ADD CONSTRAINT "cart_project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
