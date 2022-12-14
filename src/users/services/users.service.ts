import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { HttpExceptionMessages } from 'src/common/enums/http-exceptions.enum';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/services/roles.service';
import { Repository } from 'typeorm';
import { CreateUserWithRolesDto } from '../dtos/create-user-with-roles.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserWithRolesDto): Promise<User> {
    const roles: Role[] = [];

    for (const id of createUserDto.roleIds) {
      const role: Role = await this.rolesService.findOne(id);
      roles.push(role);
    }

    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      +this.configService.get<string>('SALT_ROUNDS'),
    );

    try {
      const user = this.usersRepository.create(createUserDto);
      user.roles = roles;

      return await this.usersRepository.save(user);
    } catch (err) {
      throw new BadRequestException(HttpExceptionMessages.CREATE_USER_FAIL);
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        roles: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id },
        relations: {
          roles: true,
        },
      });
    } catch (err) {
      throw new NotFoundException(HttpExceptionMessages.READ_USER_FAIL);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { email },
        relations: {
          roles: true,
        },
      });
    } catch (err) {
      throw new NotFoundException(HttpExceptionMessages.READ_USER_NAME_FAIL);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.roleIds) {
      const roles: Role[] = [];

      for (const id of updateUserDto.roleIds) {
        const role: Role = await this.rolesService.findOne(id);
        roles.push(role);
      }

      user.roles = roles;
    }

    if (updateUserDto.password) {
      user.password = bcrypt.hashSync(
        updateUserDto.password,
        +this.configService.get<string>('SALT_ROUNDS'),
      );
    }

    const { password, roleIds, ...rest} = updateUserDto;

    for (const key in rest) {
      if (updateUserDto[key]) {
        user[key] = updateUserDto[key];
      }
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
