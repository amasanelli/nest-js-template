import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SameUserGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const jwtUser: User = request.user;
    const reqUserId: number = +request.params.id;

    if (jwtUser.id !== reqUserId) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
