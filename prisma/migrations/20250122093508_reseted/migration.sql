/*
  Warnings:

  - You are about to drop the column `customization` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `colors` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `color` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "CustomOrder" DROP CONSTRAINT "CustomOrder_userId_fkey";

-- DropForeignKey
ALTER TABLE "CustomOrder" DROP CONSTRAINT "CustomOrder_workBranchId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_productId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "customization",
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "color" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colors",
DROP COLUMN "images",
ADD COLUMN     "workBranchId" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "CustomOrder";

-- DropTable
DROP TABLE "ProductSize";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "ImageColor" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT[],
    "productId" TEXT NOT NULL,

    CONSTRAINT "ImageColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customization" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "logoPosition" TEXT,
    "logoFile" TEXT,
    "notes" TEXT,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductMaterial" (
    "id" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeQuantity" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SizeQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customization_orderNumber_key" ON "Customization"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customization_productId_key" ON "Customization"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SizeQuantity_productId_size_key" ON "SizeQuantity"("productId", "size");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_workBranchId_fkey" FOREIGN KEY ("workBranchId") REFERENCES "WorkBranch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageColor" ADD CONSTRAINT "ImageColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customization" ADD CONSTRAINT "Customization_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMaterial" ADD CONSTRAINT "ProductMaterial_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeQuantity" ADD CONSTRAINT "SizeQuantity_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
