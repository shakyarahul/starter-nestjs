import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly entityRepo: Repository<User>,
  ) {}
  async findAll() {
    return this.entityRepo.find({
      relations: ['notification', 'createdRoadmaps', 'comments', 'social'],
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
    updateEnity.email = updateDto.email;
    updateEnity.first_name = updateDto.first_name;
    updateEnity.last_name = updateDto.last_name;
    updateEnity.dob = updateDto.dob;
    return this.entityRepo.save(updateEnity);
  }
  async findAUser(dto) {
    return await this.entityRepo.findOne({
      where: dto,
      relations: {
        social: {
          social_account_type: true,
        },
      },
    });
  }
}
