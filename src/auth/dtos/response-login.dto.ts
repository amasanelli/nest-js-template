import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ResponseLoginDto {
    @Expose()
    @ApiProperty()
    token: string;
}