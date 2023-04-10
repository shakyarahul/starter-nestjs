import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { Comment } from 'src/Entities/comment/Comment.entity';
import { Repository } from 'typeorm';
import { Link } from '../link/Link.entity';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { StatusEnum } from '../status/Status.entity';
import { User } from '../user/User.entity';
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

  async totalRows(
    dto = {
      page: '1',
      page_size: '10',
    },
  ) {
    return await this.entityRepo.count({
      where: {
        // title: Like(`%${dto?.keyword}%`),
      },
      order: { updated_at: -1 },
    });
  }

  async findMine(
    loggedInUser: User,
    roadmapId: Roadmap,
    linkId: any = null,
    dto = {
      page: '1',
      page_size: '10',
    },
  ) {
    console.log(linkId);
    const skip = (parseInt(dto.page) - 1) * parseInt(dto.page_size);
    const data = this.entityRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.link', 'link_tbl')
      .leftJoinAndSelect('comment.roadmap', 'roadmap_tbl')
      .leftJoinAndSelect('comment.created_by', 'user_tbl')
      .where('comment.roadmap LIKE :roadmapId', { roadmapId: `%${roadmapId}%` })
      .where(isEmpty(linkId) ? '' : 'comment.link LIKE :linkId', {
        linkId: `%${linkId}%`,
      })
      .select([
        'comment.id',
        'comment.comment',
        'comment.updated_at',
        'comment.created_at',
        'link_tbl.id',
        'link_tbl.title',
        'link_tbl.subtitle',
        'user_tbl.email',
        'user_tbl.profile_url',
        'user_tbl.first_name',
        'user_tbl.last_name',
        'roadmap_tbl.id',
        'roadmap_tbl.title',
      ])
      .skip(skip)
      .take(parseInt(dto.page_size));
    return await data.getMany();
  }
}
