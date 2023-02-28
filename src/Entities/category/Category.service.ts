import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/Entities/category/Category.entity';
import { Like, Repository } from 'typeorm';
import { StatusEnum } from '../status/Status.entity';
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
    console.log(skip, 'SKIPING');
    return await this.entityRepo.find({
      where: {
        name: Like(`%${dto?.keyword}%`),
        status: { name: StatusEnum.Approved },
      },
      relations: {
        // interested_users: true,
      },
      skip: skip,
      take: dto.page_size,
      order: { updated_at: -1 },
    });
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
}
