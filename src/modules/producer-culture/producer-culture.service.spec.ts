import { Test, TestingModule } from '@nestjs/testing';
import { ProducerCultureService } from './producer-culture.service';

describe('ProducerCultureService', () => {
  let service: ProducerCultureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducerCultureService],
    }).compile();

    service = module.get<ProducerCultureService>(ProducerCultureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
