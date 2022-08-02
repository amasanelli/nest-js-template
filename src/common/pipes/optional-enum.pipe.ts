import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { HttpExceptionMessages } from '../enums/http-exceptions.enum';

@Injectable()
export class OptionalEnumPipe<T = any> implements PipeTransform<T> {
  constructor(private readonly enumType: T) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !(value in this.enumType)) {
      throw new BadRequestException(HttpExceptionMessages.INVALID_ROLE_TYPE);
    }
    return value;
  }
}
