import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QRItem } from './QRItem.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class QRItemService {
  constructor(
    @InjectRepository(QRItem)
    private readonly entityRepo: Repository<QRItem>,
  ) {}
  async findAll() {
    return this.entityRepo.find({
      relations: ['notification', 'createdRoadmaps', 'comments', 'social'],
      order: { updated_at: -1 },
    });
  }
  async manager() {
    return this.entityRepo.manager;
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
    updateEnity.redirect_url = updateDto.redirect_url;
    updateEnity.secret_key = updateDto.secret_key;
    return await this.entityRepo.save(updateEnity);
  }
  async findAEntity(dto) {
    return await this.entityRepo.findOne({
      where: dto,
      loadRelationIds: {
        relations: ['interested_categories'],
      },
    });
  }
}
