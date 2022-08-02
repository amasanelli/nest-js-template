import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { MultipleAuthGuard } from 'src/common/guards/multiple-auth.guard';
import { SameUserGuard } from 'src/common/guards/same-user.guard';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService, SameUserGuard, AdminGuard, MultipleAuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
