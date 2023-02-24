import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAccountController } from './SocialAccount.controller';
import { SocialAccount } from './SocialAccount.entity';
import { SocialAccountService } from './SocialAccount.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialAccount])],
  controllers: [SocialAccountController],
  providers: [SocialAccountService],
  exports: [SocialAccountService],
})
export class SocialAccountModule {}
