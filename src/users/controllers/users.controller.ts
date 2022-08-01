import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiDocsDescriptions } from 'src/common/enums/api-docs.enum';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreateUserWithRolesDto } from '../dtos/create-user-with-roles.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiCreatedResponse({
    type: ResponseUserDto,
    description: ApiDocsDescriptions.CREATE_USER_OK,
  })
  @ApiBadRequestResponse({ description: ApiDocsDescriptions.CREATE_USER_FAIL })
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserWithRolesDto): Promise<ResponseUserDto> {
    const user: User = await this.usersService.create(createUserDto);
    return plainToInstance(ResponseUserDto, user);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseUserDto,
    isArray: true,
    description: ApiDocsDescriptions.READ_USERS_OK,
  })
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users: User[] = await this.usersService.findAll();
    return plainToInstance(ResponseUserDto, users);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseUserDto,
    description: ApiDocsDescriptions.READ_USER_OK,
  })
  @ApiNotFoundResponse({ description: ApiDocsDescriptions.READ_USER_FAIL })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    const user: User = await this.usersService.findOne(id);
    return plainToInstance(ResponseUserDto, user);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseUserDto,
    description: ApiDocsDescriptions.UPDATE_USER_OK,
  })
  @ApiBadRequestResponse({ description: ApiDocsDescriptions.UPDATE_USER_FAIL })
  @ApiNotFoundResponse({ description: ApiDocsDescriptions.READ_USER_FAIL })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user: User = await this.usersService.update(id, updateUserDto);
    return plainToInstance(ResponseUserDto, user);
  }

  @ApiBearerAuth('token')
  @ApiUnauthorizedResponse({ description: ApiDocsDescriptions.LOGIN_FAIL })
  @ApiOkResponse({
    type: ResponseUserDto,
    description: ApiDocsDescriptions.DELETE_USER_OK,
  })
  @ApiNotFoundResponse({ description: ApiDocsDescriptions.DELETE_USER_FAIL })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    const user: User = await this.usersService.remove(id);
    return plainToInstance(ResponseUserDto, user);
  }
}
