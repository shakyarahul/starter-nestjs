import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structure } from './Structure.entity';
import { StructureController } from './Structure.controller';
import { StructureService } from './Structure.service';

@Module({
  imports: [TypeOrmModule.forFeature([Structure])],
  controllers: [StructureController],
  providers: [StructureService],
  exports: [StructureService],
})
export class StructureModule {}
