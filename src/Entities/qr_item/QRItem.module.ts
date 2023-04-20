import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRItemController } from './QRItem.controller';
import { QRItem } from './QRItem.entity';
import { QRItemService } from './QRItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([QRItem])],
  controllers: [QRItemController],
  providers: [QRItemService],
  exports: [QRItemService],
})
export class QRItemModule {}
