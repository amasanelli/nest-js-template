import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionMessages } from 'src/common/enums/http-exceptions.enum';
import { RoleType } from 'src/roles/enums/role-type.enum';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const newRole = this.rolesRepository.create(createRoleDto);
      return await this.rolesRepository.save(newRole);
    } catch (err) {
      throw new BadRequestException(HttpExceptionMessages.CREATE_ROLE_FAIL);
    }
  }

  async findAll(type?: RoleType): Promise<Role[]> {
    if (type) {
      return this.rolesRepository.find({ where: { type } });
    }
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    try {
      return await this.rolesRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundException(HttpExceptionMessages.READ_ROLE_FAIL);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    for(const key in updateRoleDto) {
      if(updateRoleDto[key]) {
        role[key] = updateRoleDto[key]
      }
    }

    return this.rolesRepository.save(role);
  }

  async remove(id: number): Promise<Role> {
    const role = await this.findOne(id);
    return this.rolesRepository.remove(role);
  }
}
