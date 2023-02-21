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
  async findAll() {
    return this.entityRepo.find({
      relations: ['role', 'social_account_type'],
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
    updateEnity.social_account_unique_user =
      updateDto.social_account_unique_user;
    updateEnity.social_account_email = updateDto.social_account_email;
    updateEnity.social_account_type = updateDto.social_account_type;
    updateEnity.role = updateDto.role;
    return this.entityRepo.save(updateEnity);
  }
}
