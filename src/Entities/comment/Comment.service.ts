import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { Comment } from '../../Entities/comment/Comment.entity';
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
    // updateEnity.link = updateDto.link;
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
      comments_till: null,
    },
  ) {
    console.log(linkId, roadmapId, 'ADsfadsfda');
    const skip =
      (isEmpty(dto.comments_till) ? parseInt(dto.page) - 1 : 0) *
      parseInt(dto.page_size);
    const data = this.entityRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.link', 'link_tbl')
      .leftJoinAndSelect('comment.roadmap', 'roadmap_tbl')
      .leftJoinAndSelect('comment.created_by', 'user_tbl')
      .where(
        (isEmpty(dto.comments_till) ? '' : 'comment.id < :comments_till AND ') +
          'comment.roadmap = :roadmapId',
        {
          comments_till: dto.comments_till,
          roadmapId: roadmapId,
        },
      )
      // .where(isEmpty(linkId) ? '' : 'comment.link LIKE :linkId', {
      //   linkId: `%${linkId}%`,
      // })
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
      .orderBy('comment.created_at', 'DESC')
      .skip(skip)
      .take(parseInt(dto.page_size));

    /**
     * SELECT
     * `comment`.`id` AS `comment_id`,
     * `comment`.`updated_at` AS `comment_updated_at`,
     * `comment`.`created_at` AS `comment_created_at`,
     * `comment`.`comment` AS `comment_comment`,
     * `link_tbl`.`id` AS `link_tbl_id`,
     * `link_tbl`.`title` AS `link_tbl_title`,
     * `link_tbl`.`subtitle` AS `link_tbl_subtitle`,
     * `roadmap_tbl`.`id` AS `roadmap_tbl_id`,
     * `roadmap_tbl`.`title` AS `roadmap_tbl_title`,
     * `user_tbl`.`email` AS `user_tbl_email`,
     * `user_tbl`.`profile_url` AS `user_tbl_profile_url`,
     * `user_tbl`.`first_name` AS `user_tbl_first_name`,
     * `user_tbl`.`last_name` AS `user_tbl_last_name`
     * FROM `comment` `comment`
     * LEFT JOIN `link` `link_tbl` ON `link_tbl`.`id`=`comment`.`linkId`
     * LEFT JOIN `roadmap` `roadmap_tbl` ON `roadmap_tbl`.`id`=`comment`.`roadmapId`
     * LEFT JOIN `user` `user_tbl` ON `user_tbl`.`id`=`comment`.`createdById`
     * ORDER BY `comment`.`created_at` DESC
     */
    console.log(data.getSql());
    return await data.getMany();
  }
}
