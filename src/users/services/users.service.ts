import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionMessages } from 'src/common/enums/http-exceptions.enum';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/services/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const roles: Role[] = [];
    
    for (const id of createUserDto.roleIds) {
      const role: Role = await this.rolesService.findOne(id);
      roles.push(role);
    }
    
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
      throw new NotFoundException(HttpExceptionMessages.READ_ROLE_FAIL);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if(updateUserDto.roleIds) {
      const roles: Role[] = [];
    
      for (const id of updateUserDto.roleIds) {
        const role: Role = await this.rolesService.findOne(id);
        roles.push(role);
      }

      user.roles = roles;
    }

    for (const key in updateUserDto) {
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
