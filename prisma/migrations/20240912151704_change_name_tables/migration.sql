/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_idProducer_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_idUserCreate_fkey";

-- DropForeignKey
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_idUserCreate_fkey";

-- DropForeignKey
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_idUserUpdate_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Producer";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(127) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "role" INTEGER DEFAULT 1,
    "password" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cpfCnpj" TEXT NOT NULL,
    "nomeProdutor" VARCHAR(255) NOT NULL,
    "nomeFazenda" VARCHAR(255) NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "areaTotalHectares" DOUBLE PRECISION NOT NULL,
    "areaAgricultavelHectares" DOUBLE PRECISION NOT NULL,
    "areaVegetacaoHectares" DOUBLE PRECISION NOT NULL,
    "idUserCreate" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUserUpdate" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "idProducer" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUserCreate" UUID,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producer_cpfCnpj_key" ON "producer"("cpfCnpj");

-- CreateIndex
CREATE INDEX "idx_cpf_cnpj" ON "producer"("cpfCnpj");

-- CreateIndex
CREATE INDEX "idx_id_producer" ON "category"("idProducer");

-- AddForeignKey
ALTER TABLE "producer" ADD CONSTRAINT "producer_idUserCreate_fkey" FOREIGN KEY ("idUserCreate") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer" ADD CONSTRAINT "producer_idUserUpdate_fkey" FOREIGN KEY ("idUserUpdate") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_idProducer_fkey" FOREIGN KEY ("idProducer") REFERENCES "producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_idUserCreate_fkey" FOREIGN KEY ("idUserCreate") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
