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
    return await this.entityRepo.find({
      relations: ['role', 'social_account_type'],
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
    updateEnity.social_account_unique_user =
      updateDto.social_account_unique_user;
    updateEnity.social_account_email = updateDto.social_account_email;
    updateEnity.social_account_type = updateDto.social_account_type;
    updateEnity.role = updateDto.role;
    return await this.entityRepo.save(updateEnity);
  }

  async findAUser(email, unique_id, account_type) {
    return await this.entityRepo.findOne({
      where: {
        social_account_email: email,
        social_account_unique_user: unique_id,
        social_account_type: account_type,
      },
      relations: ['role', 'social_account_type'],
    });
  }
}
