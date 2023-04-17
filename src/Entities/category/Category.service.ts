import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortByEnum } from '../../API/v1/dto/categories/GET/request.dto';
import { getSorting } from '../../API/v1/helpers/index.helpers';
import { Category } from '../../Entities/category/Category.entity';
import { Like, Not, Repository } from 'typeorm';
import { StatusEnum } from '../status/Status.entity';
import { User } from '../user/User.entity';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly entityRepo: Repository<Category>,
  ) {}
  async findAll(
    dto = {
      keyword: '',
      page: 1,
      page_size: 10,
    },
  ) {
    const skip = (dto.page - 1) * dto.page_size;
    return await this.entityRepo.find({
      where: {
        name: Like(`%${dto?.keyword}%`),
        status: { name: StatusEnum.Approved },
      },
      relations: {
        status: true,
      },
      skip: skip,
      take: dto.page_size,
      order: { updated_at: -1 },
    });
  }
  async createEntityIfNotExists(data, uniqueKey = 'name') {
    const exists = await this.findAEntity({ [uniqueKey]: data[uniqueKey] });
    if (!exists) {
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
        name: Like(`%${dto?.keyword}%`),
      },
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
    updateEnity.name = updateDto.name;
    updateEnity.image_url = updateDto.image_url;
    updateEnity.description = updateDto.description;
    return this.entityRepo.save(updateEnity);
  }
  async findMine(
    loggedInUser: User,
    dto = {
      keyword: '',
      page: '1',
      page_size: '10',
      sort_by: 'latest',
    },
  ) {
    const { orderByKey, orderByValue } = await getSorting(
      dto.sort_by,
      'num_interested_users',
    );
    const skip = (parseInt(dto.page) - 1) * parseInt(dto.page_size);
    const data = this.entityRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.status', 'status_tbl')
      .where('category.name LIKE :keyword', {
        keyword: `%${dto.keyword || ''}%`,
      })
      .andWhere(
        '(status_tbl.name = :statusNameApproved OR (category.createdById = :createdById AND status_tbl.name = :statusNamePending))',
        {
          statusNameApproved: StatusEnum.Approved,
          statusNamePending: StatusEnum.Pending,
          createdById: loggedInUser.id,
        },
      )
      .select([
        'category.id',
        'category.name',
        'category.image_url',
        'category.description',
        'category.updated_at',
        'category.created_at',
        'status_tbl.id',
        'status_tbl.name',
        // 'status_tbl.color',
        // 'status_tbl.updated_at',
        // 'status_tbl.created_at',
      ])
      .groupBy('category.id')
      .orderBy('category.' + orderByKey, orderByValue)
      .skip(skip)
      .take(parseInt(dto.page_size));
    console.log(data.getSql());
    return await data.getMany();
  }
}
