import { Module } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';
import { BenchmarkController } from './benchmark.controller';
import { HashingModule } from 'src/common/hashing/hashing.module';

@Module({
  imports: [HashingModule],
  controllers: [BenchmarkController],
  providers: [BenchmarkService],
})
export class BenchmarkModule {}
