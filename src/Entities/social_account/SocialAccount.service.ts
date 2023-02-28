import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialAccount } from './SocialAccount.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class SocialAccountService {
  constructor(
    @InjectRepository(SocialAccount)
    private readonly entityRepo: Repository<SocialAccount>,
  ) {}

  async createEntityIfNotExists(data, uniqueKey = 'name') {
    const exists = await this.findAEntity({ [uniqueKey]: data[uniqueKey] });
    if (!exists) {
      return await this.create(data);
    } else {
      return await this.update({ ...data, id: exists.id });
    }
  }
  async findAEntity(entity) {
    return await this.entityRepo.findOne({
      where: entity,
      relations: ['role', 'social_account_type'],
    });
  }
  async findAll() {
    return await this.entityRepo.find({
      relations: ['role', 'social_account_type'],
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
    updateEnity.social_account_unique_user =
      updateDto.social_account_unique_user;
    updateEnity.social_account_email = updateDto.social_account_email;
    updateEnity.social_account_type = updateDto.social_account_type;
    updateEnity.role = updateDto.role;
    return await this.entityRepo.save(updateEnity);
  }
  async getQueryRunner() {
    return await this.entityRepo.createQueryBuilder();
  }
}
