/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_idProducer_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_idUserCreate_fkey";

-- DropTable
DROP TABLE "category";

-- CreateTable
CREATE TABLE "producer_culture" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "idProducer" UUID NOT NULL,
    "idCulture" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUserCreate" UUID,

    CONSTRAINT "producer_culture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "culture" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUserCreate" UUID,

    CONSTRAINT "culture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_id_producer" ON "producer_culture"("idProducer");

-- AddForeignKey
ALTER TABLE "producer_culture" ADD CONSTRAINT "producer_culture_idProducer_fkey" FOREIGN KEY ("idProducer") REFERENCES "producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_culture" ADD CONSTRAINT "producer_culture_idCulture_fkey" FOREIGN KEY ("idCulture") REFERENCES "culture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_culture" ADD CONSTRAINT "producer_culture_idUserCreate_fkey" FOREIGN KEY ("idUserCreate") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "culture" ADD CONSTRAINT "culture_idUserCreate_fkey" FOREIGN KEY ("idUserCreate") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
