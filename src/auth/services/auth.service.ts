import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpExceptionMessages } from 'src/common/enums/http-exceptions.enum';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { JWTPayloadDTO } from '../dtos/jwt-payload.dto';
import { RequestLoginDto } from '../dtos/request-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(requestLoginDto: RequestLoginDto): Promise<User> {
    try {
      const user: User = await this.usersService.findOneByEmail(
        requestLoginDto.email,
      );

      if (!bcrypt.compareSync(requestLoginDto.password, user.password)) {
        throw new UnauthorizedException('Password mismatch');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException(HttpExceptionMessages.LOGIN_FAIL);
    }
  }

  getToken(user: User): { token: string } {
    const payload: JWTPayloadDTO = {
      sub: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
