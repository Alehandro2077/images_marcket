import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Logger,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from 'src/2auth/guards/auth.guard';
import { RequestWithUser } from 'src/3user/interfaces/user.interface';

import { ApiTags } from '@nestjs/swagger';

import { IsOwnerGuard } from 'src/2auth/guards/is-owner.guard';
import { AddTagProjectDto } from './dto/add-tag-project.dto';
import {
  ApiAddTagToProject,
  ApiRemoveTAGfromProject,
} from './swager/decorators';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  private readonly logger = new Logger(TagController.name);
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthGuard)
  @Post('')
  createTag(@Body() addTagProjectDto: AddTagProjectDto) {
    return this.tagService.createTag(addTagProjectDto.title);
  }

  @ApiAddTagToProject()
  @UseGuards(AuthGuard, IsOwnerGuard)
  @Post(':projectId')
  addTagToProject(
    @Body() addTagProjectDto: AddTagProjectDto,
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
  ) {
    return this.tagService.addTagToProject(
      req.userId,
      projectId,
      addTagProjectDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }

  @UseGuards(AuthGuard)
  @Get('tags/:projectId')
  getTAGSofProject(@Param('projectId') projectId: string) {
    return this.tagService.getTAGSofProject(projectId);
  }

  @UseGuards(AuthGuard)
  @Get('projects/:tagId')
  getPROJECTSofTag(@Param('tagId') tagId: string) {
    return this.tagService.getPROJECTSofTag(tagId);
  }

  @ApiRemoveTAGfromProject()
  @UseGuards(AuthGuard, IsOwnerGuard)
  @Delete('')
  removeTAGfromProject(
    @Query('projectId') projectId: string,
    @Query('tagId') tagId: string,
  ) {
    return this.tagService.removeTAGfromProject(tagId, projectId);
  }
}
