import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUserWithRolesDto extends CreateUserDto {
  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  roleIds: number[];
}
