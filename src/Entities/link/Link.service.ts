import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from '../../Entities/link/Link.entity';
import { Like, Repository } from 'typeorm';
import { Roadmap } from '../roadmap/Roadmap.entity';
import { StatusEnum } from '../status/Status.entity';
import { User } from '../user/User.entity';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly entityRepo: Repository<Link>,
  ) {}
  async findAll() {
    return this.entityRepo.find({
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
    updateEnity.title = updateDto.title;
    updateEnity.subtitle = updateDto.subtitle;
    updateEnity.html = updateDto.html;
    updateEnity.url = updateDto.url;
    updateEnity.open_url_directly = updateDto.open_url_directly;
    updateEnity.created_by = updateDto.created_by;
    updateEnity.status = updateDto.status;
    updateEnity.parent_link = updateDto.parent_link;
    return this.entityRepo.save(updateEnity);
  }

  async totalRows(
    dto = {
      page: 1,
      page_size: 10,
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
    dto = {
      page: 1,
      page_size: 10,
    },
  ) {
    const skip = (dto.page - 1) * dto.page_size;
    const data = this.entityRepo
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.status', 'status_tbl')
      .leftJoinAndSelect('link.parent_link', 'parent_link_tbl')
      .leftJoinAndSelect('link.structure', 'structure_tbl')
      // .where('link.title LIKE :keyword', { keyword: `%${dto.keyword || ''}%` })
      .andWhere(
        '(status_tbl.name = :statusNameApproved OR (link.createdById = :createdById AND status_tbl.name = :statusNamePending))',
        {
          statusNameApproved: StatusEnum.Approved,
          statusNamePending: StatusEnum.Pending,
          createdById: loggedInUser.id,
        },
      )
      .select([
        'link.id',
        'link.title',
        'link.subtitle',
        'link.html',
        'link.url',
        'link.open_url_directly',
        'link.updated_at',
        'link.created_at',
        'status_tbl.id',
        'status_tbl.name',
        'status_tbl.color',
        // 'status_tbl.updated_at',
        // 'status_tbl.created_at',
        // 'user_tbl.updated_at',
        // 'user_tbl.created_at',
        // 'user_tbl.email',
        // 'user_tbl.profile_url',
        // 'user_tbl.first_name',
        // 'user_tbl.last_name',
        // 'user_tbl.dob',
        'parent_link_tbl.id',
        // 'parent_link_tbl.title',
        // 'parent_link_tbl.subtitle',
        // 'parent_link_tbl.html',
        // 'parent_link_tbl.url',
        // 'parent_link_tbl.open_url_directly',
        // 'parent_link_tbl.updated_at',
        // 'parent_link_tbl.created_at',
        'structure_tbl.id',
        // 'structure_tbl.updated_at',
        // 'structure_tbl.created_at',
        'structure_tbl.name',
        'structure_tbl.supported_childs',
        // 'roadmap_tbl',
      ])
      .skip(skip)
      .take(dto.page_size);
    return await data.getMany();
  }
}
