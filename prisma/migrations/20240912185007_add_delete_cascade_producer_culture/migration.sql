-- DropForeignKey
ALTER TABLE "producer_culture" DROP CONSTRAINT "producer_culture_idProducer_fkey";

-- AddForeignKey
ALTER TABLE "producer_culture" ADD CONSTRAINT "producer_culture_idProducer_fkey" FOREIGN KEY ("idProducer") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
