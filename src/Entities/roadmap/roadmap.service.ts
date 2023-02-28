import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roadmap } from './Roadmap.entity';
import { Like, Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';
import { StatusEnum } from '../status/Status.entity';
import { User } from '../user/User.entity';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(Roadmap)
    private readonly entityRepo: Repository<Roadmap>,
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
  async totalRows(
    dto = {
      keyword: '',
      page: 1,
      page_size: 10,
    },
  ) {
    return await this.entityRepo.count({
      where: {
        title: Like(`%${dto?.keyword}%`),
      },
      order: { updated_at: -1 },
    });
  }

  async findMine(
    loggedInUser: User,
    dto = {
      keyword: '',
      page: 1,
      page_size: 10,
    },
  ) {
    const skip = (dto.page - 1) * dto.page_size;
    console.log(skip, 'SKIPING');
    const data = this.entityRepo
      .createQueryBuilder('roadmap')
      .leftJoinAndSelect('roadmap.status', 'status_tbl')
      .where('roadmap.title LIKE :keyword', { keyword: `%${dto.keyword}%` })
      .andWhere(
        '(status_tbl.name = :statusNameApproved OR (roadmap.createdById = :createdById AND status_tbl.name = :statusNamePending))',
        {
          statusNameApproved: StatusEnum.Approved,
          statusNamePending: StatusEnum.Pending,
          createdById: loggedInUser.id,
        },
      )
      .select([
        'roadmap.id',
        'roadmap.title',
        'roadmap.subtitle',
        'roadmap.description',
        'roadmap.svg_url',
        'roadmap.views',
        'roadmap.updated_at',
        'roadmap.created_at',
        'roadmap.createdById',
        'roadmap.statusId',
        'roadmap.structureId',
        'status_tbl.id',
        'status_tbl.name',
        'status_tbl.color',
        'status_tbl.updated_at',
        'status_tbl.created_at',
      ])
      .skip(skip)
      .take(dto.page_size);
    return await data.getMany();
  }

  async update(updateDto: UpdateRequestDto) {
    const updateEnity = await this.entityRepo.findOneOrFail({
      where: {
        id: updateDto.id,
      },
    });
    updateEnity.title = updateDto.title;
    updateEnity.subtitle = updateDto.subtitle;
    updateEnity.created_by = updateDto.created_by;
    updateEnity.status = updateDto.status;
    updateEnity.description = updateDto.description;
    return this.entityRepo.save(updateEnity);
  }
}
