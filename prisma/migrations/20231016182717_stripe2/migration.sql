/*
  Warnings:

  - You are about to drop the `invoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_organizationId_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "stripeId" TEXT;

-- DropTable
DROP TABLE "invoice";

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
