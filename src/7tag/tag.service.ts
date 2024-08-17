import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from 'src/1database/prisma.service';
import { AddTagProjectDto } from './dto/add-tag-project.dto';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  private readonly logger = new Logger(TagService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async addTagToProject(
    userId: string,
    projectId: string,
    addTagProjectDto: AddTagProjectDto,
  ) {
    try {
      if (addTagProjectDto.tagId) {
        return this.assignTagToProject(
          userId,
          addTagProjectDto.tagId,
          projectId,
        );
      }
      if (addTagProjectDto.title) {
        let tag: Tag;
        console.log('-=-=-=-=-in if create ');
        tag = await this.prismaService.tag.findUnique({
          where: { title: addTagProjectDto.title },
        });
        console.log('-=-=-=-=tag', tag);
        if (!tag) {
          tag = await this.createTag(addTagProjectDto.title);
        }
        return this.assignTagToProject(userId, tag.id, projectId);
      }
    } catch (error) {
      this.logger.error('addTagToProject ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while create tag.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTag(title: string) {
    try {
      return await this.prismaService.tag.create({ data: { title } });
    } catch (error) {
      this.logger.error('addTagToProject ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while create tag.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignTagToProject(userId: string, tagId: string, projectId: string) {
    try {
      const projectTag = await this.prismaService.projectTag.create({
        data: { projectId, tagId: tagId, assignedById: userId },
      });

      return projectTag;
    } catch (error) {
      this.logger.error('addTagToProject ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while assign tag.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllTags() {
    try {
      return await this.prismaService.tag.findMany();
    } catch (error) {
      throw new HttpException(
        'An error occurred while getting all tags.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTAGSofProject(projectId: string) {
    try {
      const tagsOfProj = await this.prismaService.tag.findMany({
        where: { projects: { some: { projectId } } },
      });

      return tagsOfProj;
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

  async getPROJECTSofTag(tagId: string) {
    try {
      const projectsOfTag = await this.prismaService.project.findMany({
        where: {
          tags: { some: { tagId } },
        },
        include: { images: { orderBy: { orderIndex: 'desc' }, take: 1 } },
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

  async removeTAGfromProject(tagId: string, projectId: string) {
    try {
      const res = await this.prismaService.projectTag.delete({
        where: {
          projectId_tagId: {
            projectId,
            tagId,
          },
        },
      });

      return res;
    } catch (error) {
      this.logger.error('removeTAGfromProject ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while removing tag of project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
