import { Injectable, Logger } from '@nestjs/common';

import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { TPrismaTransaction } from 'src/1database/types/custom.types';

@Injectable()
export class CreatorService {
  private readonly logger = new Logger(CreatorService.name);

  async create(
    userId: string,
    createCreatorDto: CreateCreatorDto,
    transactionClient: TPrismaTransaction,
  ) {
    const creator = await transactionClient.creatorData.create({
      data: { ...createCreatorDto, userId },
    });

    return creator;
  }

  findAll() {
    return `This action returns all creator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creator`;
  }

  update(id: number, updateCreatorDto: UpdateCreatorDto) {
    return `This action updates a #${id} creator`;
  }

  remove(id: number) {
    return `This action removes a #${id} creator`;
  }
}
