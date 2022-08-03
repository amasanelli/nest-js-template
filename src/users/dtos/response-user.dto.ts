import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseRoleDto } from 'src/roles/dtos/response-role.dto';

@Exclude()
export class ResponseUserDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @Type(() => ResponseRoleDto)
  @ApiProperty({ isArray: true, type: ResponseRoleDto })
  roles: ResponseRoleDto[];
}
