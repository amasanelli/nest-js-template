import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { RoleType } from 'src/roles/enums/role-type.enum';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsAlphanumeric()
  description: string;

  @ApiProperty({ required: false, enum: RoleType })
  @IsOptional()
  @IsEnum(RoleType)
  type: RoleType;
}
