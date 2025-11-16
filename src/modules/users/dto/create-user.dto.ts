import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  algorithm: string;

  @ApiProperty()
  parameters?: string;
}
