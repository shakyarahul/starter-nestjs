import { Module } from '@nestjs/common';
import { NotificationStatusService } from './notification_status.service';
import { NotificationStatusController } from './notification_status.controller';

@Module({
  providers: [NotificationStatusService],
  controllers: [NotificationStatusController]
})
export class NotificationStatusModule {}
