import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { ListResponseDto } from './dto/ListResponse.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';
import { QRItemService as EntityService } from './QRItem.service';

@ApiTags('QRItem')
@Controller('qrItem')
export class QRItemController {
  constructor(private readonly entityService: EntityService) {}
}
