import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roadmap } from 'src/Entities/roadmap/Roadmap.entity';
import { RoadmapController } from './Roadmap.controller';
import { RoadmapService } from './Roadmap.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roadmap])],
  controllers: [RoadmapController],
  providers: [RoadmapService],
  exports: [RoadmapService],
})
export class RoadmapModule {}
