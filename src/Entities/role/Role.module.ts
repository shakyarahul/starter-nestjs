import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/Entities/role/Role.entity';
import { SocialAccountModule } from '../social_account/SocialAccount.module';
import { RoleController } from './Role.controller';
import { RoleService } from './Role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), SocialAccountModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
