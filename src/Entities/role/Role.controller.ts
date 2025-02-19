import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { HasRoles, RoleEnum } from '../../API/v1/decorator/roles.decorator';
import { JwtAuthGuard } from '../../API/v1/guard/jwt-auth.guard';
import { RolesGuard } from '../../API/v1/guard/roles.guard';
import { CreateRequestDto } from './dto/CreateRequest.dto';
import { ListResponseDto } from './dto/ListResponse.dto';
import { UpdateRequestDto } from './dto/UpdateRequest.dto';
import { RoleService as EntityService } from './Role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly entityService: EntityService) {}
  @HasRoles(RoleEnum.Author)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  @ApiCreatedResponse({
    description: 'Listing',
    type: ListResponseDto,
  })
  async list(@Request() req) {
    const data = await this.entityService.findAll();
    const listResDto = new ListResponseDto();
    listResDto.data = data;
    listResDto.meta_data = {
      count: data.length,
      updated_at: data.length == 0 ? new Date() : data[0].updated_at,
    };
    return listResDto;
  }

  @HasRoles(RoleEnum.Author)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  @ApiCreatedResponse({
    description: 'Added & Listing',
    type: ListResponseDto,
  })
  async create(@Body() createDto: CreateRequestDto) {
    await this.entityService.create(createDto);
    return this.entityService.findAll();
  }

  @HasRoles(RoleEnum.Author)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/')
  @ApiCreatedResponse({
    description: 'Updated & Listing',
    type: ListResponseDto,
  })
  async update(@Body() updateDto: UpdateRequestDto) {
    await this.entityService.update(updateDto);
    return this.entityService.findAll();
  }
}
