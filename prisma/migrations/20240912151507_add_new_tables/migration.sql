-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(127) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "role" INTEGER DEFAULT 1,
    "password" VARCHAR(127) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producer" (
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

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "idProducer" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUserCreate" UUID,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_cpfCnpj_key" ON "Producer"("cpfCnpj");

-- CreateIndex
CREATE INDEX "idx_cpf_cnpj" ON "Producer"("cpfCnpj");

-- CreateIndex
CREATE INDEX "idx_id_producer" ON "Category"("idProducer");

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_idUserCreate_fkey" FOREIGN KEY ("idUserCreate") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_idUserUpdate_fkey" FOREIGN KEY ("idUserUpdate") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idProducer_fkey" FOREIGN KEY ("idProducer") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idUserCreate_fkey" FOREIGN KEY ("idUserCreate") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
