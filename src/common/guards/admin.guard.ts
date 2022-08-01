import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RoleType } from 'src/roles/enums/role-type.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const isAdmin = user.roles.some((role) => {
      return role.type === RoleType.ADMIN;
    });

    if (!isAdmin) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
