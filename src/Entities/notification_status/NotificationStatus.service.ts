import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationStatus } from 'src/Entities/notification_status/NotificationStatus.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class NotificationStatusService {
  constructor(
    @InjectRepository(NotificationStatus)
    private readonly entityRepo: Repository<NotificationStatus>,
  ) {}
  async findAll() {
    return this.entityRepo.find({
      order: { updated_at: -1 },
    });
  }
  async create(createDto: CreateRequestDto, save: boolean = true) {
    const newEntity = this.entityRepo.create(createDto);
    if (save) {
      return await this.entityRepo.save(newEntity);
    }
    return newEntity;
  }
  async update(updateDto: UpdateRequestDto) {
    const updateEnity = await this.entityRepo.findOneOrFail({
      where: {
        id: updateDto.id,
      },
    });
    updateEnity.change_category_status = updateDto.change_category_status;
    updateEnity.change_roadmap_status = updateDto.change_roadmap_status;
    updateEnity.comment_on_your_roadmap = updateDto.comment_on_your_roadmap;
    updateEnity.comment_on_your_commented_roadmap =
      updateDto.comment_on_your_commented_roadmap;
    updateEnity.comment_on_your_roadmap_link =
      updateDto.comment_on_your_roadmap_link;
    updateEnity.comment_on_your_commented_roadmap_link =
      updateDto.comment_on_your_commented_roadmap_link;
    updateEnity.when_added_new_roadmap_on_your_interested_category =
      updateDto.when_added_new_roadmap_on_your_interested_category;

    return this.entityRepo.save(updateEnity);
  }
}
