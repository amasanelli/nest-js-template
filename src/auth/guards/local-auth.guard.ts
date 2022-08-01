import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Observable } from 'rxjs';
import { HttpExceptionMessages } from 'src/common/enums/http-exceptions.enum';
import { RequestLoginDto } from '../dtos/request-login.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.body);

    const object = plainToInstance(RequestLoginDto, request.body);
    const errors = validateSync(object);
    if (errors.length > 0) {
      throw new BadRequestException(HttpExceptionMessages.VALID_LOGIN_DATA);
    }
    return super.canActivate(context);
  }
}
