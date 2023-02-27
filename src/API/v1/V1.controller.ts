import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { V1Service as EntityService } from './V1.service';
import { RequestDto as post_continue_with_RequestDto } from './dto/continue_with/POST/request.dto';
import { ResponseDto as post_continue_with_ResponseDto } from './dto/continue_with/POST/response.dto';
import { ResponseDto as get_continue_with_ResponseDto } from './dto/continue_with/GET/response.dto';

import { RequestDto as get_profile_RequestDto } from './dto/profile/GET/request.dto';
import { ResponseDto as get_profile_ResponseDto } from './dto/profile/GET/response.dto';
import { RequestDto as post_profile_RequestDto } from './dto/profile/POST/request.dto';
import { ResponseDto as post_profile_ResponseDto } from './dto/profile/POST/response.dto';

import { RequestDto as post_upload_RequestDto } from './dto/upload/POST/request.dto';
import { ResponseDto as post_upload_ResponseDto } from './dto/upload/POST/response.dto';

import { Validate } from 'class-validator';
import { getLastUpdatedDate } from './helpers/index.helpers';
import { SocialAccount } from 'src/Entities/social_account/SocialAccount.entity';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';
import { User } from 'src/Entities/user/User.entity';
import { JwtService } from '@nestjs/jwt';
import { HasRoles, RoleEnum } from './decorator/roles.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('V1')
@Controller('v1')
export class V1Controller {
  constructor(
    private readonly entityService: EntityService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * Gets the list of all available social login in the application
   * @returns {Promise<get_continue_with_ResponseDto>}
   */
  @Get('/continue_with')
  @ApiCreatedResponse({
    description: 'Listing of available social login for the application',
    type: get_continue_with_ResponseDto,
  })
  async get_continue_with(): Promise<get_continue_with_ResponseDto> {
    const data: Array<SocialAccountType> =
      await this.entityService.get_continue_with();
    const response: get_continue_with_ResponseDto = {
      data,
      meta_data: { last_updated: getLastUpdatedDate(data) },
    };
    return response;
  }

  /**
   *
   * @param dto Object that is to be searched in the user db or else created
   * @returns {Promise<post_continue_with_ResponseDto>}
   */
  @Post('/continue_with')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description:
      'Api that helps users to login with the available social login',
    type: post_continue_with_ResponseDto,
  })
  async post_continue_with(
    @Body() dto: post_continue_with_RequestDto,
  ): Promise<post_continue_with_ResponseDto> {
    const data: User = await this.entityService.post_continue_with(dto);
    const payload = {
      name: data.email,
      sub: data.social.id,
      roles: [data.social.role.name],
    };
    const response: post_continue_with_ResponseDto = {
      data,
      meta_data: {
        last_updated: getLastUpdatedDate(data),
        access_token: this.jwtService.sign(payload),
      },
    };
    return response;
  }

  /**
   *
   * @param dto Object that is to be generate from available access_token
   * @returns {Promise<get_continue_with_ResponseDto>}
   */

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/profile')
  @HttpCode(200)
  @ApiCreatedResponse({
    description:
      'Api that helps users to login with the available social login',
    type: get_profile_ResponseDto,
  })
  async get_profile(@Request() req: any): Promise<get_profile_ResponseDto> {
    console.log(req, 'readf');
    const response: get_profile_ResponseDto = {
      data: req.user,
      meta_data: { last_updated: getLastUpdatedDate(req.user) },
    };
    return response;
  }

  /**
   *
   * @param dto Api that helps users to update few profile informations
   * @returns {Promise<post_continue_with_ResponseDto>}
   */

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/profile')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few profile informations',
    type: post_profile_ResponseDto,
  })
  async post_profile(
    @Request() req: any,
    @Body() dto: post_profile_RequestDto,
  ): Promise<post_profile_ResponseDto> {
    const data: User = await this.entityService.post_profile(dto, req.user);
    const response: post_profile_ResponseDto = {
      data: data,
      meta_data: { last_updated: getLastUpdatedDate(req.user) },
    };
    return response;
  }

  /**
   *
   * @param dto Api that helps to upload any type of time and upload it to sever generate a link to that resource
   * @returns {Promise<post_continue_with_ResponseDto>}
   */

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/uploads')
  @UseInterceptors(
    FileInterceptor(
      'file',

      {
        storage: diskStorage({
          destination: './uploads',

          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
            cb(null, filename);
          },
        }),
      },
    ),
  )
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few profile informations',
    type: post_profile_ResponseDto,
  })
  async post_upload(
    @Request() req: any,
    @UploadedFile() file,
    // @Res() res,
  ): Promise<post_upload_ResponseDto> {
    const data: any = await this.entityService.post_upload(file);
    const response: post_upload_ResponseDto = {
      data: data,
      meta_data: { last_updated: getLastUpdatedDate(req.user) },
    };
    // return res.sendFile(data.filename, { root: 'uploads' });
    return response;
  }

  /**
   *
   * @param dto Api that helps to upload any type of time and upload it to sever generate a link to that resource
   * @returns {Promise<post_continue_with_ResponseDto>}
   */

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/uploads/:filename')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few profile informations',
    type: post_profile_ResponseDto,
  })
  async get_upload(
    @Param('filename') filename: any,
    //  @UploadedFile() file,
    @Res() res,
  ): Promise<post_upload_ResponseDto> {
    return res.sendFile(filename, { root: 'uploads' });
  }
}
