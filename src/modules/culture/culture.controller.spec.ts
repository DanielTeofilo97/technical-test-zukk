import { Test, TestingModule } from '@nestjs/testing';
import { CultureController } from './culture.controller';

describe('CultureController', () => {
  let controller: CultureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultureController],
    }).compile();

    controller = module.get<CultureController>(CultureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
