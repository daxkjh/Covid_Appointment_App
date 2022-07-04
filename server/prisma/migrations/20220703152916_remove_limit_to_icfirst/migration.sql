-- DropIndex
DROP INDEX "Patient_icfirst_key";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "icfirst" SET DATA TYPE TEXT;
