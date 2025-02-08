/*
  Warnings:

  - A unique constraint covering the columns `[purchase_id]` on the table `PurchaseDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Purchase_remark_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "remark" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PurchaseDetail" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseDetail_purchase_id_key" ON "PurchaseDetail"("purchase_id");
