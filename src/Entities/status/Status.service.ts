import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/Entities/status/Status.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly entityRepo: Repository<Status>,
  ) {}
  async createEntityIfNotExists(data, uniqueKey = 'name') {
    const exists = await this.findAEntity({ [uniqueKey]: data[uniqueKey] });
    if (!exists) {
      return await this.create(data);
    } else {
      return await this.update({ ...data, id: exists.id });
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
