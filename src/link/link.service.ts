import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/link/Link.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly entityRepo: Repository<Link>,
  ) {}
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
    updateEnity.title = updateDto.title;
    updateEnity.subtitle = updateDto.subtitle;
    updateEnity.html = updateDto.html;
    updateEnity.url = updateDto.url;
    updateEnity.open_url_directly = updateDto.open_url_directly;
    updateEnity.created_by = updateDto.created_by;
    updateEnity.status = updateDto.status;
    updateEnity.parent_link = updateDto.parent_link;
    return this.entityRepo.save(updateEnity);
  }
}
