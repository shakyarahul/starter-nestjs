import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/Entities/comment/Comment.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly entityRepo: Repository<Comment>,
  ) {}
  async findAll() {
    return this.entityRepo.find({
      relations: ['created_by', 'roadmap', 'link'],
      order: { updated_at: -1 },
    });
  }
  async create(createDto: CreateRequestDto) {
    const newEntity = this.entityRepo.create(createDto);
    return this.entityRepo.save(newEntity);
  }
  async update(updateDto: UpdateRequestDto) {
    const updateEnity = await this.entityRepo.findOneOrFail({
      where: {
        id: updateDto.id,
      },
    });
    updateEnity.comment = updateDto.comment;
    updateEnity.created_by = updateDto.created_by;
    updateEnity.link = updateDto.link;
    updateEnity.roadmap = updateDto.roadmap;
    return this.entityRepo.save(updateEnity);
  }
}
