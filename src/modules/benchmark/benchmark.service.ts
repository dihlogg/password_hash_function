import { Injectable } from '@nestjs/common';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';
import { UpdateBenchmarkDto } from './dto/update-benchmark.dto';
import { HashAlgorithm, HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class BenchmarkService {
  constructor(private hashingService: HashingService) {}

  async run(): Promise<any[]> {
    const results: { algorithm: HashAlgorithm; timeMs: number }[] = [];
    const password = 'P@ssw0rd123';
    const salt = this.hashingService.generateSalt();

    for (const algorithm of Object.values(HashAlgorithm)) {
      const start = Date.now();
      await this.hashingService.hashPassword(password, salt, algorithm as HashAlgorithm);
      const timeMs = Date.now() - start;

      results.push({ algorithm, timeMs });
    }
    return results;
  }
}
