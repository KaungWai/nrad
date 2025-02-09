-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PLANNING', 'CONFIRMED');

-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_id" VARCHAR(36) NOT NULL,
    "supplier_name" VARCHAR(100) NOT NULL,
    "supplier_phone" VARCHAR(14) NOT NULL,
    "supplier_email" VARCHAR(256) NOT NULL,
    "supplier_address" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" VARCHAR(36) NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "purchase_id" VARCHAR(36) NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "arrival_date" TIMESTAMP(3) NOT NULL,
    "supplier_id" VARCHAR(36) NOT NULL,
    "remark" VARCHAR(500) NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("purchase_id")
);

-- CreateTable
CREATE TABLE "PurchaseDetail" (
    "purchase_detail_id" VARCHAR(36) NOT NULL,
    "purchase_id" VARCHAR(36) NOT NULL,
    "product_id" VARCHAR(36) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseDetail_pkey" PRIMARY KEY ("purchase_detail_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_remark_key" ON "Purchase"("remark");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseDetail_product_id_key" ON "PurchaseDetail"("product_id");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
