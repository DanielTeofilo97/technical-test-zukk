import { Test, TestingModule } from '@nestjs/testing';
import { PostmanController } from './postman.controller';

describe('PostmanController', () => {
  let controller: PostmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostmanController],
    }).compile();

    controller = module.get<PostmanController>(PostmanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
