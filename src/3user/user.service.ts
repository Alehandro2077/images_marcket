import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { CreateUserDtoWithPassword } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TPrismaTransaction } from 'src/1database/types/custom.types';
import { PrismaService } from 'src/1database/prisma.service';
import { formatUserData } from './helpers/format-user';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createUserDto: CreateUserDtoWithPassword,
    roleId: string,
    transactionClient: TPrismaTransaction,
  ) {
    const user = await transactionClient.user.create({
      data: { ...createUserDto, roleId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    return user;
  }

  async getFullUserInfo(userId: string) {
    try {
      const userDb = await this.prismaService.user.findUnique({
        where: { id: userId },
        include: {
          role: { select: { role: true } },
          creatorData: true,
          supplierData: true,
        },
      });

      const user = formatUserData(userDb, userDb.role.role);

      return user;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        'An error occurred while authenticate.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
