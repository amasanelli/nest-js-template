import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { ResponseRoleDto } from "src/roles/dtos/response-role.dto";
import { Role } from "src/roles/entities/role.entity";

@Exclude()
export class ResponseUserDto {
    @Expose()
    @ApiProperty()
    id: number;
  
    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty({isArray: true, type: ResponseRoleDto})
    roles: Role[];
}