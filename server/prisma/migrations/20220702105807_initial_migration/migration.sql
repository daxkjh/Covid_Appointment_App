-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ic" TEXT NOT NULL,
    "slotsId" INTEGER,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacCenter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "postal" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "VacCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slots" (
    "id" SERIAL NOT NULL,
    "booking" TIMESTAMP(3) NOT NULL,
    "vacCenterId" INTEGER NOT NULL,

    CONSTRAINT "Slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_ic_key" ON "Patient"("ic");

-- CreateIndex
CREATE UNIQUE INDEX "VacCenter_name_key" ON "VacCenter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VacCenter_postal_key" ON "VacCenter"("postal");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_slotsId_fkey" FOREIGN KEY ("slotsId") REFERENCES "Slots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_vacCenterId_fkey" FOREIGN KEY ("vacCenterId") REFERENCES "VacCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
