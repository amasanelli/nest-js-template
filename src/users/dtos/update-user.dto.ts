import { PartialType } from '@nestjs/swagger';
import { CreateUserWithRolesDto } from './create-user-with-roles.dto';

export class UpdateUserDto extends PartialType(CreateUserWithRolesDto) {}
