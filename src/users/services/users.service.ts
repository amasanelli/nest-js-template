import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionMessages } from 'src/common/enums/http-exceptions.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newRole = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newRole);
    } catch (err) {
      throw new BadRequestException(HttpExceptionMessages.CREATE_USER_FAIL);
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundException(HttpExceptionMessages.READ_ROLE_FAIL);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const role = await this.findOne(id);

    for(const key in updateUserDto) {
      if(updateUserDto[key]) {
        role[key] = updateUserDto[key]
      }
    }

    return this.usersRepository.save(role);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
