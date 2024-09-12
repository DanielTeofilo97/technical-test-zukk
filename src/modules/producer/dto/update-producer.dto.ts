import { PartialType } from '@nestjs/swagger';
import { CreateProducerDTO } from './create-producer.dto';

export class UpdateProducerDTO extends PartialType(CreateProducerDTO) {}
