import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export enum HashAlgorithm {
  MD5 = 'md5',
  SHA256 = 'sha256',
  BCRYPT = 'bcrypt',
  ARGON2 = 'argon2',
}

@Injectable()
export class HashingService {
  private pepper = process.env.PEPPER;

  generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  async hashPassword(
    password: string,
    salt: string,
    algorithm: HashAlgorithm,
  ): Promise<string> {
    const combined = password + this.pepper + salt;

    switch (algorithm) {
      case HashAlgorithm.MD5:
        return crypto.createHash('md5').update(combined).digest('hex');
      case HashAlgorithm.SHA256:
        return crypto.createHash('sha256').update(combined).digest('hex');
      case HashAlgorithm.BCRYPT:
        return await bcrypt.hash(combined, 10);
      case HashAlgorithm.ARGON2:
        return await argon2.hash(combined);
      default:
        throw new Error('Unsupported algorithm');
    }
  }

  async compareHash(
    raw: string,
    salt: string,
    savedHash: string,
    algorithm: HashAlgorithm,
  ): Promise<boolean> {
    const combined = raw + this.pepper + salt;
    if (algorithm === HashAlgorithm.BCRYPT) {
      return await bcrypt.compare(combined, savedHash);
    }
    if (algorithm === HashAlgorithm.ARGON2) {
      return await argon2.verify(savedHash, combined);
    }
    const hash = crypto.createHash(algorithm).update(combined).digest('hex');
    return hash === savedHash;
  }
}
