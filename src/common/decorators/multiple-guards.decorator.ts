import { CanActivate, SetMetadata, Type } from '@nestjs/common';

export const MULTIPLE_GUARDS_KEY = 'MULTIPLEGUARDS';
export const MultipleGuards = (...guards: Type<CanActivate>[]) =>
  SetMetadata(MULTIPLE_GUARDS_KEY, guards);
