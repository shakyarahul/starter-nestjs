import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { ListResponseDto } from './dto/ListResponse.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';
import { NotificationStatusService as EntityService } from './NotificationStatus.service';

@ApiTags('NotificationStatus')
@Controller('notification_status')
export class NotificationStatusController {
  constructor(private readonly entityService: EntityService) {}
  @Get('/')
  @ApiCreatedResponse({
    description: 'Listing',
    type: ListResponseDto,
  })
  async list() {
    const data = await this.entityService.findAll();
    const listResDto = new ListResponseDto();
    listResDto.data = data;
    listResDto.meta_data = {
      count: data.length,
      updated_at: data.length == 0 ? new Date() : data[0].updated_at,
    };
    return listResDto;
  }
  @Post('/')
  @ApiCreatedResponse({
    description: 'Added & Listing',
    type: ListResponseDto,
  })
  async create(@Body() createDto: CreateRequestDto) {
    await this.entityService.create(createDto);
    return this.list();
  }

  @Put('/')
  @ApiCreatedResponse({
    description: 'Updated & Listing',
    type: ListResponseDto,
  })
  async update(@Body() updateDto: UpdateRequestDto) {
    await this.entityService.update(updateDto);
    return this.list();
  }
}
