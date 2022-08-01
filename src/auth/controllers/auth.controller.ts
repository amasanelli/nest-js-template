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
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @NoJWT()
  @UseGuards(RequestLoginDtoGuard, LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    // @Body() body: RequestLoginDto, // ANCHOR: no validating
  ): Promise<ResponseLoginDto> {
    const token = this.authService.getToken(req.user as User);
    return plainToInstance(ResponseLoginDto, token);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<ResponseUserDto> {
    return plainToInstance(ResponseUserDto, req.user);
  }
}
