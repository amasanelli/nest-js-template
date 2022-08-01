import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
} from 'class-validator';

export class RequestLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}