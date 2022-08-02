import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { MULTIPLE_GUARDS_KEY } from '../decorators/multiple-guards.decorator';

@Injectable()
export class MultipleAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedGuards =
      this.reflector.get<Type<CanActivate>[]>(
        MULTIPLE_GUARDS_KEY,
        context.getHandler(),
      ) || [];

    const guards = allowedGuards.map((guardReference) =>
      this.moduleRef.get<CanActivate>(guardReference),
    );

    if (guards.length === 0) {
      return Promise.resolve(true);
    }

    if (guards.length === 1) {
      return guards[0].canActivate(context) as Promise<boolean>;
    }

    return Promise.any(
      guards.map((guard) => {
        try {
          return guard.canActivate(context) as Promise<boolean>;
        } catch (error) {
          return Promise.resolve(false);
        }
      }),
    );
  }
}
