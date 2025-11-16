import { Test, TestingModule } from '@nestjs/testing';
import { BenchmarkController } from './benchmark.controller';
import { BenchmarkService } from './benchmark.service';

describe('BenchmarkController', () => {
  let controller: BenchmarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenchmarkController],
      providers: [BenchmarkService],
    }).compile();

    controller = module.get<BenchmarkController>(BenchmarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
