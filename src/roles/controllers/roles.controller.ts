import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { ResponseRoleDto } from '../dtos/response-role.dto';
import { plainToInstance } from 'class-transformer';
import { ApiDocsDescriptions } from 'src/common/enums/api-docs.enum';
import { RoleType } from 'src/roles/enums/role-type.enum';
import { OptionalEnumPipe } from 'src/common/pipes/optional-enum.pipe';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiCreatedResponse({
    type: ResponseRoleDto,
    description: ApiDocsDescriptions.CREATE_ROLE_OK,
  })
  @ApiBadRequestResponse({ description: ApiDocsDescriptions.CREATE_ROLE_FAIL })
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseRoleDto> {
    const role: Role = await this.rolesService.create(createRoleDto);
    return plainToInstance(ResponseRoleDto, role);
  }

  @ApiQuery({ name: 'type', required: false, enum: RoleType})
  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseRoleDto,
    isArray: true,
    description: ApiDocsDescriptions.READ_ROLES_OK,
  })
  @Get()
  async findAll(@Query('type', new OptionalEnumPipe(RoleType)) type: RoleType): Promise<ResponseRoleDto[]> {
    const roles: Role[] = await this.rolesService.findAll(type);
    return plainToInstance(ResponseRoleDto, roles);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseRoleDto,
    description: ApiDocsDescriptions.READ_ROLE_OK,
  })
  @ApiNotFoundResponse({ description: ApiDocsDescriptions.READ_ROLE_FAIL })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseRoleDto> {
    const role: Role = await this.rolesService.findOne(id);
    return plainToInstance(ResponseRoleDto, role);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseRoleDto,
    description: ApiDocsDescriptions.UPDATE_ROLE_OK,
  })
  @ApiBadRequestResponse({ description: ApiDocsDescriptions.UPDATE_ROLE_FAIL })
  @ApiNotFoundResponse({ description: ApiDocsDescriptions.READ_ROLE_FAIL })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    const role: Role = await this.rolesService.update(id, updateRoleDto);
    return plainToInstance(ResponseRoleDto, role);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseRoleDto,
    description: ApiDocsDescriptions.DELETE_ROLE_OK,
  })
  @ApiNotFoundResponse({ description: ApiDocsDescriptions.READ_ROLE_FAIL })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseRoleDto> {
    const role: Role = await this.rolesService.remove(id);
    return plainToInstance(ResponseRoleDto, role);
  }
}
