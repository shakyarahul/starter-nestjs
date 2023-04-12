import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roadmap } from './Roadmap.entity';
import { Like, Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';
import { StatusEnum } from '../status/Status.entity';
import { User } from '../user/User.entity';
import { isEmpty } from 'class-validator';

@Injectable()
export class RoadmapService {
  constructor(
    @InjectRepository(Roadmap)
    private readonly entityRepo: Repository<Roadmap>,
  ) {}
  async findAll() {
    return this.entityRepo.find({
      relations: {
        categories: true,
        status: true,
      },
      order: { updated_at: -1 },
    });
  }
  async create(createDto: CreateRequestDto) {
    const newEntity = await this.entityRepo.create(createDto);
    return await this.entityRepo.save(newEntity);
  }
  async createEntityIfNotExists(data, uniqueKey = 'name') {
    const exists = await this.findAEntity({ [uniqueKey]: data[uniqueKey] });
    if (!exists) {
      console.log('asdfadsfdasfdas', data);
      await this.create(data);
    } else {
      await this.update({ ...data, id: exists.id });
    }
  }
  async findAEntity(entity) {
    return await this.entityRepo.findOneBy(entity);
  }
  async totalRows(
    dto = {
      keyword: '',
      page: '1',
      page_size: '10',
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
      page: '1',
      page_size: '10',
      category: null,
    },
  ) {
    const skip = (parseInt(dto.page) - 1) * parseInt(dto.page_size);
    const isProUser =
      loggedInUser.social.role.name == 'Administrator' ||
      loggedInUser.social.role.name == 'Editor';
    const data = this.entityRepo
      .createQueryBuilder('roadmap')
      .leftJoinAndSelect('roadmap.status', 'status_tbl')
      .leftJoinAndSelect('roadmap.categories', 'categories_tbl')
      .where(
        `roadmap.title LIKE :keyword ${
          isProUser
            ? ''
            : 'AND (status_tbl.name = :statusNameApproved OR (roadmap.createdById = :createdById AND status_tbl.name = :statusNamePending))'
        } `,
        {
          statusNameApproved: StatusEnum.Approved,
          statusNamePending: StatusEnum.Pending,
          createdById: loggedInUser.id,
          keyword: `%${dto.keyword || ''}%`,
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
        'status_tbl.id',
        'status_tbl.name',
        'status_tbl.color',
        // 'status_tbl.updated_at',
        // 'status_tbl.created_at',
        'categories_tbl',
      ])
      .skip(skip)
      .orderBy('roadmap.created_at', 'DESC')
      .take(parseInt(dto.page_size));
    if (isEmpty(dto.category)) {
      return await data.getMany();
    } else {
      const zxc = await data.getMany();
      return zxc.filter((v) => {
        return v.categories.map((k) => k.id).includes(parseInt(dto.category));
      });
    }
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
