import { SetMetadata } from '@nestjs/common';

export const NO_JWT_KEY = 'NO_JWT';
export const NoJWT = () => SetMetadata(NO_JWT_KEY, true);