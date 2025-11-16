import { Injectable } from '@nestjs/common';
import { CreateExportDto } from './dto/create-export.dto';
import { UpdateExportDto } from './dto/update-export.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ExportService {
  constructor(private userService: UsersService) {}

  async exportHashes(): Promise<string[]> {
    const users = await this.userService.findAll();

    return users.map(user => 
      `${user.username}:$${user.algorithm}$${user.salt}$${user.hash}`
    );
  }
}
