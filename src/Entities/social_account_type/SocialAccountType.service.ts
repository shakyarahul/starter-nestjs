import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialAccountType } from '../../Entities/social_account_type/SocialAccountType.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class SocialAccountTypeService {
  constructor(
    @InjectRepository(SocialAccountType)
    private readonly entityRepo: Repository<SocialAccountType>,
  ) {}
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
  async findAll() {
    return await this.entityRepo.find({
      order: { updated_at: -1 },
    });
  }
  async create(createDto: CreateRequestDto) {
    const newEntity = this.entityRepo.create(createDto);
    return await this.entityRepo.save(newEntity);
  }
  async update(updateDto: UpdateRequestDto) {
    const updateEnity = await this.entityRepo.findOneOrFail({
      where: {
        id: updateDto.id,
      },
    });
    updateEnity.name = updateDto.name;
    updateEnity.title = updateDto.title;
    return this.entityRepo.save(updateEnity);
  }
}
