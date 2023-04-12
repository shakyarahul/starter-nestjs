import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
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

import { ResponseDto as get_profile_ResponseDto } from './dto/profile/GET/response.dto';
import { RequestDto as post_profile_RequestDto } from './dto/profile/POST/request.dto';
import { ResponseDto as post_profile_ResponseDto } from './dto/profile/POST/response.dto';

import { RequestDto as post_categories_RequestDto } from './dto/categories/POST/request.dto';
import { ResponseDto as post_categories_ResponseDto } from './dto/categories/POST/response.dto';

import { RequestDto as post_roadmaps_RequestDto } from './dto/roadmaps/POST/request.dto';
import { ResponseDto as post_roadmaps_ResponseDto } from './dto/roadmaps/POST/response.dto';

import { RequestDto as get_roadmaps_RequestDto } from './dto/roadmaps/GET/request.dto';
import { ResponseDto as get_roadmaps_ResponseDto } from './dto/roadmaps/GET/response.dto';

import { RequestDto as post_links_RequestDto } from './dto/links/POST/request.dto';
import { ResponseDto as post_links_ResponseDto } from './dto/links/POST/response.dto';

import { RequestDto as get_links_RequestDto } from './dto/links/GET/request.dto';
import { ResponseDto as get_links_ResponseDto } from './dto/links/GET/response.dto';

import { RequestDto as get_comments_RequestDto } from './dto/comments/GET/request.dto';
import { ResponseDto as get_comments_ResponseDto } from './dto/comments/GET/response.dto';

import { RequestDto as post_comments_RequestDto } from './dto/comments/POST/request.dto';
import { ResponseDto as post_comments_ResponseDto } from './dto/comments/POST/response.dto';

import {
  RequestDto as get_categories_RequestDto,
  SortByEnum,
} from './dto/categories/GET/request.dto';
import { ResponseDto as get_categories_ResponseDto } from './dto/categories/GET/response.dto';

import { RequestDto as post_upload_RequestDto } from './dto/upload/POST/request.dto';
import { ResponseDto as post_upload_ResponseDto } from './dto/upload/POST/response.dto';
import { getLastUpdatedDate } from './helpers/index.helpers';
import { SocialAccountType } from 'src/Entities/social_account_type/SocialAccountType.entity';
import { User } from 'src/Entities/user/User.entity';
import { JwtService } from '@nestjs/jwt';
import { HasRoles, RoleEnum } from './decorator/roles.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Category } from 'src/Entities/category/Category.entity';
import { Roadmap } from 'src/Entities/roadmap/Roadmap.entity';
import { Link } from 'src/Entities/link/Link.entity';
import { Comment } from 'src/Entities/comment/Comment.entity';

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

    return this.get_profile(req);
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

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/categories')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few categories informations',
    type: post_categories_ResponseDto,
  })
  async post_categories(
    @Request() req: any,
    @Body() dto: post_categories_RequestDto,
  ): Promise<get_categories_ResponseDto> {
    const result: Category = await this.entityService.post_categories(
      dto,
      req.user,
    );
    if (result) {
      return await this.get_the_categories(req.user);
    }
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/categories')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few categories informations',
    type: post_categories_ResponseDto,
  })
  async get_categories(
    @Request() req: any,
    @Query() dto: get_categories_RequestDto,
  ): Promise<get_categories_ResponseDto> {
    console.log(dto, 'QSDS');
    return await this.get_the_categories(req.user, dto);
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/roadmaps')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few roadmaps informations',
    type: post_roadmaps_ResponseDto,
  })
  async post_roadmaps(
    @Request() req: any,
    @Body() dto: post_roadmaps_RequestDto,
  ): Promise<post_roadmaps_ResponseDto> {
    const result: Roadmap = await this.entityService.post_roadmaps(
      dto,
      req.user,
    );
    if (result) {
      return await this.get_the_roadmaps(req.user);
    }
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/roadmaps')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few roadmaps informations',
    type: get_roadmaps_ResponseDto,
  })
  async get_roadmaps(
    @Request() req: any,
    @Query() dto: get_roadmaps_RequestDto,
  ): Promise<get_roadmaps_ResponseDto> {
    return await this.get_the_roadmaps(req.user, dto);
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/links/:roadmapId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few links informations',
    type: post_links_ResponseDto,
  })
  async post_links(
    @Request() req: any,
    @Body() dto: post_links_RequestDto,
    @Param('roadmapId') roadMapId: Roadmap,
  ): Promise<post_links_ResponseDto> {
    const result: Link = await this.entityService.post_links(dto, req.user);
    if (result) {
      return await this.get_the_links(req.user, roadMapId);
    }
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/links/:roadmapId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few links informations',
    type: get_links_ResponseDto,
  })
  async get_links(
    @Request() req: any,
    @Query() dto: get_links_RequestDto,
    @Param('roadmapId') roadMapId: Roadmap,
  ): Promise<get_links_ResponseDto> {
    return await this.get_the_links(req.user, roadMapId, dto);
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/comments/:roadmapId/:linkId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few comments informations',
    type: post_comments_ResponseDto,
  })
  async post_comments(
    @Request() req: any,
    @Body() dto: post_comments_RequestDto,
    @Param('roadmapId') roadMapId: Roadmap,
    // @Param('linkId') linkId: any,
  ): Promise<post_comments_ResponseDto> {
    const result: Comment = await this.entityService.post_comments(
      dto,
      req.user,
    );
    if (result) {
      // return await this.get_the_comments(req.user, roadMapId, linkId);
      return await this.get_the_comments(req.user, roadMapId);
    }
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/comments/:roadmapId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few comments informations',
    type: post_comments_ResponseDto,
  })
  async post__comments(
    @Request() req: any,
    @Body() dto: post_comments_RequestDto,
    @Param('roadmapId') roadMapId: Roadmap,
    // @Param('linkId') linkId: any,
  ): Promise<post_comments_ResponseDto> {
    // return await this.post__comments(req, dto, roadMapId, linkId);
    return await this.post_comments(req, dto, roadMapId);
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/comments/:roadmapId/:linkId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few comments informations',
    type: get_comments_ResponseDto,
  })
  async get_comments(
    @Request() req: any,
    @Query() dto: get_comments_RequestDto,
    @Param('roadmapId') roadMapId: Roadmap,
    @Param('linkId') linkId: any,
  ): Promise<get_comments_ResponseDto> {
    return await this.get_the_comments(req.user, roadMapId, linkId, dto);
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/comments/:roadmapId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few comments informations',
    type: get_comments_ResponseDto,
  })
  async get__comments(
    @Request() req: any,
    @Query() dto: get_comments_RequestDto,
    @Param('roadmapId') roadMapId: Roadmap,
    @Param('linkId') linkId: any,
  ): Promise<get_comments_ResponseDto> {
    return await this.get_comments(req.user, dto, roadMapId, linkId);
  }

  @HasRoles(RoleEnum.Subscriber)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('set_interest_in_category/:categoryId')
  @HttpCode(200)
  @ApiCreatedResponse({
    description: 'Api that helps users to update few comments informations',
    type: Promise<any>,
  })
  async set_interest_in_category(
    @Request() req: any,
    @Param('categoryId') categoryId: Category,
  ): Promise<any> {
    const user: User = req.user;
    const data: any = await this.entityService.set_interest_in_category(
      user,
      categoryId,
    );
    const response: post_upload_ResponseDto = {
      data: data,
      meta_data: { last_updated: getLastUpdatedDate(data) },
    };
    // return res.sendFile(data.filename, { root: 'uploads' });
    return response;
  }

  async get_the_categories(
    user: User,
    dto: get_categories_RequestDto = {
      page: '1',
      page_size: '10',
      sort_by: SortByEnum.Latest,
      keyword: '',
    },
  ): Promise<get_categories_ResponseDto> {
    const data: Array<Category> = await this.entityService.get_categories(
      user,
      dto,
    );
    const total: number = await this.entityService.total_categories(dto);
    const has_next: boolean =
      total - parseInt(dto.page) * parseInt(dto.page_size) > 0;
    const response: get_categories_ResponseDto = {
      data: data,
      meta_data: {
        last_updated: getLastUpdatedDate(data),
        query_params: dto,
        total_pages: Math.ceil(total / parseInt(dto.page_size)),
        sort_by: Object.values(SortByEnum),
        has_next,
      },
    };
    return response;
  }

  async get_the_roadmaps(
    user: User,
    dto: get_roadmaps_RequestDto = {
      page: '1',
      page_size: '10',
      sort_by: SortByEnum.Latest,
      keyword: '',
      category: null,
    },
  ): Promise<get_roadmaps_ResponseDto> {
    const data: Array<Roadmap> = await this.entityService.get_roadmaps(
      user,
      dto,
    );
    const total: number = await this.entityService.total_roadmaps(dto);
    const has_next: boolean =
      total - parseInt(dto.page) * parseInt(dto.page_size) > 0;
    const response: get_roadmaps_ResponseDto = {
      data: data,
      meta_data: {
        last_updated: getLastUpdatedDate(data),
        query_params: dto,
        total_pages: Math.ceil(total / parseInt(dto.page_size)),
        sort_by: Object.values(SortByEnum),
        has_next,
      },
    };
    return response;
  }

  async get_the_links(
    user: User,
    roadmapId: Roadmap,
    dto: get_links_RequestDto = {
      page: 1,
      page_size: 10,
    },
  ): Promise<get_links_ResponseDto> {
    const data: Array<Link> = await this.entityService.get_links(
      user,
      roadmapId,
      dto,
    );
    const total: number = await this.entityService.total_links(dto);
    const has_next: boolean = total - dto.page * dto.page_size > 0;
    const response: get_links_ResponseDto = {
      data: data,
      meta_data: {
        last_updated: getLastUpdatedDate(data),
        query_params: dto,
        total_pages: Math.ceil(total / dto.page_size),
        sort_by: Object.values(SortByEnum),
        has_next,
      },
    };
    return response;
  }

  async get_the_comments(
    user: User,
    roadmapId: Roadmap,
    linkId: any = null,
    dto: get_comments_RequestDto = {
      page: '1',
      page_size: '10',
      comments_till: null,
    },
  ): Promise<get_comments_ResponseDto> {
    const data: Array<Comment> = await this.entityService.get_comments(
      user,
      roadmapId,
      linkId,
      dto,
    );
    const total: number = await this.entityService.total_comments(dto);
    const has_next: boolean =
      total - parseInt(dto.page) * parseInt(dto.page_size) > 0;
    const response: get_comments_ResponseDto = {
      data: data,
      meta_data: {
        last_updated: getLastUpdatedDate(data),
        query_params: dto,
        total_pages: Math.ceil(total / parseInt(dto.page_size)),
        sort_by: Object.values(SortByEnum),
        has_next,
      },
    };
    return response;
  }
}
