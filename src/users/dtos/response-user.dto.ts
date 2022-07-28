import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ResponseUserDto {
    @Expose()
    @ApiProperty()
    id: number;
  
    @Expose()
    @ApiProperty()
    name: string;
}