import { CreateRoleDto } from 'src/roles/dtos/create-role.dto';
import { RoleType } from 'src/roles/enums/role-type.enum';

export const RoleSeed: CreateRoleDto = {
  name: 'INIT',
  description: 'INIT',
  type: RoleType.ADMIN,
};
