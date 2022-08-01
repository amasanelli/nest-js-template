import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
