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
import { ResponsetDto } from './dto/continue_with/GET/response.dto';
import { V1Service as EntityService } from './V1.service';
import { RequestDto } from './dto/continue_with/POST/request.dto';

@ApiTags('V1')
@Controller('v1')
export class V1Controller {
  constructor(private readonly entityService: EntityService) {}

  @Get('/continue_with')
  @ApiCreatedResponse({
    description: 'Listing of available social login for the application',
    type: ResponsetDto,
  })
  async get_continue_with(@Request() req) {
    console.log('user', req);
    return this.entityService.get_continue_with();
  }

  @Post('/continue_with')
  @ApiCreatedResponse({
    description:
      'Api that helps users to login with the available social login',
    type: ResponsetDto,
  })
  async post_continue_with(@Body() createDto: RequestDto) {
    return this.entityService.post_continue_with(createDto);
  }
}
