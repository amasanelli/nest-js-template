import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { NO_JWT_KEY } from 'src/common/decorators/no-jwt.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noJWT = this.reflector.getAllAndOverride<boolean>(NO_JWT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noJWT) {
      return true;
    }
    return super.canActivate(context);
  }
}
