import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationStatus } from 'src/Entities/notification_status/NotificationStatus.entity';
import { NotificationStatusController } from './NotificationStatus.controller';
import { NotificationStatusService } from './NotificationStatus.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationStatus])],
  controllers: [NotificationStatusController],
  providers: [NotificationStatusService],
  exports: [NotificationStatusService],
})
export class NotificationStatusModule {}
