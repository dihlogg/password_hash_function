import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repo.create(createUserDto);
    return await this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with Username ${username} not found`);
    }
    return user;
  }
}
