import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/1database/prisma.service';
import { FileUploadService } from './uppload.service';
import { FileDto } from './dto/file.dto';
import { ResortImagesDto } from './dto/resort.images.dto';
import { Prisma } from '@prisma/client';
import { getSqlQueryResort } from './sql/sql-reqs';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async create(createProjectDto: CreateProjectDto, userId: string) {
    try {
      const project = await this.prismaService.project.create({
        data: { ...createProjectDto, ownerId: userId },
      });

      return project;
    } catch (error) {
      this.logger.error('project create', error);

      throw new HttpException(
        'An error occurred while sign in.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllProjects() {
    try {
      const projects = await this.prismaService.project.findMany({
        include: { images: { orderBy: { orderIndex: 'desc' }, take: 1 } },

        orderBy: { createdAt: 'desc' },
      });

      const promisesKey = projects.map((proj) => {
        if (proj.images.length > 0) {
          const key = proj.images[0].thumbnailKey;
          return this.fileUploadService.getSignedUrl(key);
        }
      });

      const thumbnailUrlArr = await Promise.all(promisesKey);

      const resultProjects = projects.map((proj, i) => {
        const img = proj.images[0];
        proj.images = Array.of(img);
        proj.images[0] = { ...img, thumbnailUrl: thumbnailUrlArr[i] };

        return proj;
      });

      return resultProjects;
    } catch (error) {
      this.logger.error('project get all', error);

      console.log('-=-=-=-=-=-=-=error ', error);

      throw new HttpException(
        'An error occurred getting all projects.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUserProjectsFace(userId: string) {
    try {
      const projects = await this.prismaService.project.findMany({
        where: { ownerId: userId },
        include: { images: { orderBy: { orderIndex: 'desc' }, take: 1 } },

        orderBy: { createdAt: 'desc' },
      });

      const promisesKey = projects.map((proj) => {
        if (proj.images.length > 0) {
          const key = proj.images[0].thumbnailKey;
          return this.fileUploadService.getSignedUrl(key);
        }
      });

      const thumbnailUrlArr = await Promise.all(promisesKey);

      // projects.forEach((proj, i) => {
      //   const img = proj.images[0];
      //   proj.images = Array.of(img);
      //   proj.images[0] = { ...img, thumbnailUrl: thumbnailUrlArr[i] };
      //   proj = { ...proj, author: img.author };
      // });

      const resultProjects = projects.map((proj, i) => {
        const img = proj.images[0];
        proj.images = Array.of(img);
        proj.images[0] = { ...img, thumbnailUrl: thumbnailUrlArr[i] };

        return proj;
      });

      return resultProjects;
    } catch (error) {
      this.logger.error('project of user get all', error);

      console.log('-=-=-=-=-=-=-=error ', error);

      throw new HttpException(
        'An error occurred getting all user projects.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async wrapGetSignedUrl(originalkey: string, thumbnailKey: string) {
    const originalUrl = await this.fileUploadService.getSignedUrl(originalkey);
    const thumbnailUrl =
      await this.fileUploadService.getSignedUrl(thumbnailKey);
    return { originalUrl, thumbnailUrl };
  }

  async getOne(userId: string, id: string) {
    try {
      console.log('-=-=-=-=-=-id', id);
      const project = await this.prismaService.project.findUnique({
        where: { id },
      });

      if (!project) {
        throw new NotFoundException('Such project does not found');
      }
      console.log('-==-=-=-=-=-proj ', project);
      const images = await this.prismaService.image.findMany({
        where: { projectId: project.id },
        orderBy: {
          orderIndex: 'desc',
        },
      });
      const creator = await this.prismaService.creatorData.findUnique({
        where: { userId: project.ownerId },
        select: { firstName: true, surname: true },
      });

      console.log('-=-=-=-=-=-= project', project);

      const promises = images.map((img) => {
        return this.wrapGetSignedUrl(img.originalKey, img.thumbnailKey);
      });

      const result = await Promise.all(promises);

      images.forEach((img, index) => {
        img.originalUrl = result[index].originalUrl;
        img.thumbnailUrl = result[index].thumbnailUrl;
      });

      return {
        author: `${creator.firstName} ${creator.surname}`,
        ...project,
        images,
      };
    } catch (error) {
      this.logger.error('find one project ', error);
      if (error.status === 404) {
        throw error;
      }

      throw new HttpException(
        'An error occurred while find one project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async searchCreatorProjects(userId: string, searchString: string) {
  //   try {
  //   } catch (error) {
  //     this.logger.error('searchCreatorProjects', error);

  //     if (error.name === 'PrismaClientKnownRequestError') {
  //       throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
  //     }
  //     throw new HttpException(
  //       'An error occurred while searching the creator project.',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  private helperCreateWhereClauseSearchProjects(
    userId: string,
    userRole: string,
    searchString: string,
  ): Prisma.ProjectWhereInput {
    if (userRole === 'creator') {
      return {
        ownerId: userId,
        OR: [
          { title: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      };
    } else {
      return {
        OR: [
          { title: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      };
    }
  }

  async searchProjects(userId: string, userRole: string, searchString: string) {
    try {
      console.log('-=-=-=-=-=-searchString', searchString);

      const whereClause = this.helperCreateWhereClauseSearchProjects(
        userId,
        userRole,
        searchString,
      );
      const projects = await this.prismaService.project.findMany({
        where: whereClause,
        include: { images: { orderBy: { orderIndex: 'desc' }, take: 1 } },
        orderBy: { createdAt: 'desc' },
      });

      const taggedprojects = await this.getPROJECTSofTag(searchString);

      const concatProjArr = projects.concat(taggedprojects);

      const promisesKey = concatProjArr.map((proj) => {
        if (proj.images.length > 0) {
          const key = proj.images[0].thumbnailKey;
          return this.fileUploadService.getSignedUrl(key);
        }
      });

      const thumbnailUrlArr = await Promise.all(promisesKey);

      const resultProjects = concatProjArr.map((proj, i) => {
        const img = proj.images[0];

        proj.images[0] = { ...img, thumbnailUrl: thumbnailUrlArr[i] };

        return proj;
      });

      return resultProjects;
    } catch (error) {
      this.logger.error('searchProject', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'An error occurred while searching the project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPROJECTSofTag(tagTitle: string) {
    try {
      const projectsOfTag = await this.prismaService.project.findMany({
        where: {
          tags: { some: { tag: { title: tagTitle } } },
        },
        include: { images: { orderBy: { orderIndex: 'desc' }, take: 1 } },
        orderBy: { createdAt: 'desc' },
      });

      return projectsOfTag;
    } catch (error) {
      this.logger.error('addTagToProject ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while getting tags of project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resortImages(resortImagesDto: ResortImagesDto) {
    try {
      const { imageOrderArr } = resortImagesDto;

      console.log('-=-=-=-=-=-=-imageOrderArr', imageOrderArr);

      const values = imageOrderArr
        .map((image) => `('${image.imageId}', ${image.orderIndex})`)
        .join(', ');

      const query = getSqlQueryResort(values);

      await this.prismaService.$executeRaw(query);
    } catch (error) {
      this.logger.error('Resort images ', error);
      console.log('0-=-=-=-=-=-=-=-error', error);
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'An error occurred while resort images.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadFile2(file: FileDto, userId: string, projectId: string) {
    try {
      const originalFileKey = `${uuidv4()}-${file.title}`;
      const thunbnailFileKey = `thumbnail-${uuidv4()}-${file.title}`;

      const presignedOrigUrl = await this.fileUploadService.uploadImage2(
        originalFileKey,
        file.mimeType,
      );

      const presignedThumbnailUrl = await this.fileUploadService.uploadImage2(
        thunbnailFileKey,
        file.mimeType,
      );

      console.log('-=-=-=-=-=-presignedOrigUrl', presignedOrigUrl);

      console.log('-=-=-=-=-=-presignedThumbnailUrl', presignedThumbnailUrl);

      const { firstName, surname, defaultPrice } =
        await this.prismaService.creatorData.findUnique({
          where: { userId },
          select: { firstName: true, surname: true, defaultPrice: true },
        });

      let imageTitle: string;

      if (file.title.includes('.')) {
        imageTitle = file.title.split('.').slice(0, -1).join('.');
      } else {
        imageTitle = file.title;
      }

      console.log('-=-=-=-=-=file.title', file.title);

      console.log('-=-=-=-=-=imageTitle', imageTitle);

      const image = await this.prismaService.image.create({
        data: {
          projectId: projectId,
          title: imageTitle,
          author: `${firstName} ${surname}`,
          price: defaultPrice,
          originalKey: originalFileKey,
          thumbnailKey: thunbnailFileKey,
        },
        select: {
          id: true,
          projectId: true,
          title: true,
          author: true,
          price: true,
          orderIndex: true,
        },
      });
      console.log('-=-=-=-=-=-=-image', image);

      return {
        presignedOrigUrl,
        presignedThumbnailUrl,
      };
    } catch (error) {
      this.logger.error('UPLOAD FILE ', error);
      console.log('-==-=-=-=-error', error);
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'An error occurred while fuppload file.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    const { title, description } = updateProjectDto;
    const newProj = await this.prismaService.project.update({
      where: { id: projectId },
      data: { title, description },
      select: { title: true, description: true },
    });
    return newProj;
  }

  async removeProject(projectId: string) {
    try {
      const imageKeys = await this.prismaService.image.findMany({
        where: { projectId },
        select: { originalKey: true, thumbnailKey: true },
      });
      // const thumbnailKeysPromise = this.prismaService.image.findMany({
      //   where: { projectId },
      //   select: { thumbnailKey: true },
      // });

      // const [originalKeys, thumbnailKeys] = await Promise.all([
      //   originalKeysPromise,
      //   thumbnailKeysPromise,
      // ]);

      const deletedOriginalImages = await this.fileUploadService.deleteImages(
        imageKeys.map((img) => img.originalKey),
      );
      const deletedThumbnailImages = await this.fileUploadService.deleteImages(
        imageKeys.map((img) => img.thumbnailKey),
      );
      // const deletedThumbnailImages =
      //   this.fileUploadService.deleteImage(thumbnailKeys);

      await this.prismaService.image.deleteMany({ where: { projectId } });
      await this.prismaService.projectTag.deleteMany({ where: { projectId } });
      await this.prismaService.project.delete({ where: { id: projectId } });

      return;
    } catch (error) {
      this.logger.error('delete project', error);

      throw new HttpException(
        'An error occurred while deleting the project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeImage(imageId: string) {
    try {
      const keys = await this.prismaService.image.findUnique({
        where: { id: imageId },
        select: { originalKey: true, thumbnailKey: true },
      });

      console.log('-=-=-=-=-=-=-keys: ', keys);
      const deleted = await this.fileUploadService.deleteOneImage(
        keys.originalKey,
        keys.thumbnailKey,
      );
      await this.prismaService.image.delete({ where: { id: imageId } });

      return;
    } catch (error) {
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'An error occurred while delete image.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isImageOfProject(projectId: string, imageId: string) {
    try {
      const image = await this.prismaService.image.findUnique({
        where: { id: imageId, projectId },
      });
      if (!image) return false;

      return true;
    } catch (error) {
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'An error occurred while check owner of image.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isUserOwnerOfProject(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: projectId,
        ownerId: userId,
      },
      select: {
        ownerId: true,
      },
    });

    if (!project) {
      return false; // Project not found or doesn't exist
    }

    return project.ownerId === userId;
  }
}
