import { Module } from '@nestjs/common';
import { SocialAccountTypeService } from './social_account_type.service';
import { SocialAccountTypeController } from './social_account_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAccountType } from 'src/social_account_type/social_account_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialAccountType])],
  providers: [SocialAccountTypeService],
  controllers: [SocialAccountTypeController],
})
export class SocialAccountTypeModule {}
