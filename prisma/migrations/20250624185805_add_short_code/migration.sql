/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `URL` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "URL" ADD COLUMN     "shortCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortCode_key" ON "URL"("shortCode");
