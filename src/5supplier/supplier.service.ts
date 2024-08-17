import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { TPrismaTransaction } from 'src/1database/types/custom.types';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);

  async create(
    userId: string,
    createSupplierDto: CreateSupplierDto,
    transactionClient: TPrismaTransaction,
  ) {
    const supplier = await transactionClient.supplierData.create({
      data: { ...createSupplierDto, userId },
    });

    await transactionClient.cart.create({ data: { userId } });

    return supplier;
  }
}
