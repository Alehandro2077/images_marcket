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
  HttpCode,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/2auth/guards/auth.guard';
import { RequestWithUser } from 'src/3user/interfaces/user.interface';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './uppload.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiGetAllProjects,
  ApiGetOneProject,
  ApiResortImages,
  ApiSearchAllProjects,
  ApiSearchCreatorProjects,
  ApiUpploadImages,
} from './swager/decorators';
import { FileDto, FilesArrayDto } from './dto/file.dto';
import { IsOwnerGuard } from 'src/2auth/guards/is-owner.guard';
import { DeleteImageDto } from './dto/delete-image.dto';
import { ResortImagesDto } from './dto/resort.images.dto';
import { SearchProjectDto } from './dto/search-project.dto';
import { RolesGuard } from 'src/2auth/guards/role.guard';
import { Roles } from 'src/2auth/decorators/role.decorator';
@ApiTags('project')
@Controller('project')
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);
  constructor(
    private readonly projectService: ProjectService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: RequestWithUser,
  ) {
    return this.projectService.create(createProjectDto, req.userId);
  }

  @UseGuards(AuthGuard, IsOwnerGuard)
  @Patch(':projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(projectId, updateProjectDto);
  }

  @ApiResortImages()
  @UseGuards(AuthGuard, IsOwnerGuard)
  @Patch('resort-images/:projectId')
  resortImages(
    @Param('projectId') projectId: string,
    @Body() resortImagesDto: ResortImagesDto,
  ) {
    return this.projectService.resortImages(resortImagesDto);
  }

  @ApiGetAllProjects()
  @UseGuards(AuthGuard)
  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @UseGuards(AuthGuard)
  @Get('my-projects')
  getAllUserProjectsFace(@Req() req: RequestWithUser) {
    return this.projectService.getAllUserProjectsFace(req.userId);
  }

  @ApiGetOneProject()
  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.projectService.getOne(req.userId, id);
  }

  @ApiSearchAllProjects()
  @HttpCode(HttpStatus.OK)
  @Roles(['supplier'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('search')
  searchALLProjects(
    @Req() req: RequestWithUser,
    @Body() searchProjectDto: SearchProjectDto,
  ) {
    return this.projectService.searchProjects(
      req.userId,
      req.userRole,
      searchProjectDto.searchString,
    );
  }

  @ApiSearchCreatorProjects()
  @HttpCode(HttpStatus.OK)
  @Roles(['creator'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('search-creator')
  searchCreatorProjects(
    @Req() req: RequestWithUser,
    @Body() searchProjectDto: SearchProjectDto,
  ) {
    return this.projectService.searchProjects(
      req.userId,
      req.userRole,
      searchProjectDto.searchString,
    );
  }

  @UseGuards(AuthGuard, IsOwnerGuard)
  @Delete('delete-project/:projectId')
  removeProject(@Param('projectId') projectId: string) {
    return this.projectService.removeProject(projectId);
  }

  @UseGuards(AuthGuard, IsOwnerGuard)
  @Delete('image')
  removeImage(@Query() deleteImageDto: DeleteImageDto) {
    return this.projectService.removeImage(deleteImageDto.imageId);
  }

  @ApiUpploadImages()
  @UseGuards(AuthGuard)
  @Post('upload/:projectId')
  async uploadFile(
    @Req() request: RequestWithUser,
    @Body() filesArray: FilesArrayDto,
    @Param('projectId') projectId: string,
  ) {
    try {
      const { files } = filesArray;

      const uploadPromises = files.map((file) =>
        this.projectService.uploadFile2(file, request.userId, projectId),
      );

      const imagesArr = await Promise.all(uploadPromises);

      return imagesArr;
    } catch (error) {
      this.logger.error('upload images ', error);
      console.log('error in co upload files', error);

      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }

      throw new HttpException(
        'An error occurred while upload images.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
