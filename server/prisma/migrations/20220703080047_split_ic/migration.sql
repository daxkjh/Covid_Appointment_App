/*
  Warnings:

  - You are about to drop the column `ic` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[icfirst]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `icfirst` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icsecond` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Patient_ic_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "ic",
ADD COLUMN     "icfirst" TEXT NOT NULL,
ADD COLUMN     "icsecond" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_icfirst_key" ON "Patient"("icfirst");
