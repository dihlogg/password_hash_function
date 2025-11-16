import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
  HashAlgorithm,
  HashingService,
} from 'src/common/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, algorithm: HashAlgorithm) {
    const salt = this.hashingService.generateSalt();
    const hash = await this.hashingService.hashPassword(
      password,
      salt,
      algorithm,
    );

    return this.userService.create({ username, salt, hash, algorithm });
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await this.hashingService.compareHash(
      password,
      user.salt,
      user.hash,
      user.algorithm as HashAlgorithm,
    );

    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload); // Đã có secret → OK

    return {
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        algorithm: user.algorithm,
      },
    };
  }
}
