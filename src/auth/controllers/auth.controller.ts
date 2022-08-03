import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { NoJWT } from 'src/common/decorators/no-jwt.decorator';
import { ApiDocsDescriptions } from 'src/common/enums/api-docs.enum';
import { ResponseUserDto } from 'src/users/dtos/response-user.dto';
import { User } from 'src/users/entities/user.entity';
import { RequestLoginDto } from '../dtos/request-login.dto';
import { ResponseLoginDto } from '../dtos/response-login.dto';
import { GoogleGuard } from '../guards/google.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestLoginDtoGuard } from '../guards/request-login-dtoguard';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RequestLoginDto })
  @ApiOkResponse({
    type: ResponseLoginDto,
    description: ApiDocsDescriptions.LOGIN_OK,
  })
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.UNAUTHORIZED })
  @NoJWT()
  @UseGuards(RequestLoginDtoGuard, LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    // @Body() body: RequestLoginDto, // ANCHOR: no validation here, so validation is done in guards
  ): Promise<ResponseLoginDto> {
    const token = this.authService.getToken(req.user as User);
    return plainToInstance(ResponseLoginDto, token);
  }

  @NoJWT()
  @Get('login/google')
  @UseGuards(GoogleGuard)
  async loginGoogle(@Req() req: Request) {}

  @NoJWT()
  @Get('login/google/redirect')
  @UseGuards(GoogleGuard)
  async loginGoogleRedirect(@Req() req: Request): Promise<ResponseLoginDto> {
    const token = this.authService.getToken(req.user as User);
    return plainToInstance(ResponseLoginDto, token);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.UNAUTHORIZED })
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<ResponseUserDto> {
    return plainToInstance(ResponseUserDto, req.user);
  }
}
