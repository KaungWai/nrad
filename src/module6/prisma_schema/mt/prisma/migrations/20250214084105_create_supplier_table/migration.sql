-- CreateTable
CREATE TABLE "Supplier" (
    "supplier_id" VARCHAR(36) NOT NULL,
    "supplier_name" VARCHAR(100) NOT NULL,
    "supplier_phone" VARCHAR(14) NOT NULL,
    "supplier_email" VARCHAR(256) NOT NULL,
    "supplier_address" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);
