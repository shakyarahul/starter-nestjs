import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../Entities/role/Role.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly entityRepo: Repository<Role>,
  ) {}

  async createEntityIfNotExists(data, uniqueKey = 'name') {
    const exists = await this.findAEntity({ [uniqueKey]: data[uniqueKey] });
    if (!exists) {
      await this.create(data);
    } else {
      await this.update({ ...data, id: exists.id });
    }
  }
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
    updateEnity.name = updateDto.name;
    return this.entityRepo.save(updateEnity);
  }

  async findAEntity(data) {
    return await this.entityRepo.findOneBy(data);
  }
}
