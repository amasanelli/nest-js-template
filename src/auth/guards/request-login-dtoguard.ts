import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { HttpExceptionMessages } from "src/common/enums/http-exceptions.enum";
import { RequestLoginDto } from "../dtos/request-login.dto";

@Injectable()
export class RequestLoginDtoGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const request = context.switchToHttp().getRequest();

    const object = plainToInstance(RequestLoginDto, request.body);
    const errors = validateSync(object);

    if (errors.length > 0) {
      throw new BadRequestException(HttpExceptionMessages.INVALID_LOGIN_DATA);
    }

    return true;
  }
}