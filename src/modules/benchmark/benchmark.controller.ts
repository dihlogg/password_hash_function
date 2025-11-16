import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';
import { UpdateBenchmarkDto } from './dto/update-benchmark.dto';

@Controller('Benchmark')
export class BenchmarkController {
  constructor(private service: BenchmarkService) {}

  @Get()
  run() {
    return this.service.run();
  }
}
