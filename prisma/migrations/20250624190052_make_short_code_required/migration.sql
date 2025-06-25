/*
  Warnings:

  - Made the column `shortCode` on table `URL` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "URL" ALTER COLUMN "shortCode" SET NOT NULL;
