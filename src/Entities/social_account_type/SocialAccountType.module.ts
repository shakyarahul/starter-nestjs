import { Module } from '@nestjs/common';
import { SocialAccountTypeService } from './SocialAccountType.service';
import { SocialAccountTypeController } from './SocialAccountType.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialAccountType])],
  providers: [SocialAccountTypeService],
  controllers: [SocialAccountTypeController],
})
export class SocialAccountTypeModule {}
