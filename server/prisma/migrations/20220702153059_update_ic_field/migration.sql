/*
  Warnings:

  - You are about to alter the column `ic` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.

*/
-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "ic" SET DATA TYPE VARCHAR(9);
