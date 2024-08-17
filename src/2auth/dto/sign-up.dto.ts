import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  NotContains,
  Validate,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { RoleValidation } from '../validators/role.validator';
import { CreateCreatorDto } from 'src/4creator/dto/create-creator.dto';
import { CreateSupplierDto } from 'src/5supplier/dto/create-supplier.dto';
import { CreateUserDtoWithPassword } from 'src/3user/dto/create-user.dto';

export class SignUpDto {
  @ApiProperty({ example: 'creator|supplier' })
  @Validate(RoleValidation)
  role: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateUserDtoWithPassword)
  userData: CreateUserDtoWithPassword;

  // @ApiProperty()
  // @ValidateNested()
  // @IsNotEmpty()
  // // @Type(() => CreateCreatorDto | CreateSupplierDto)
  // accountData: CreateCreatorDto | CreateSupplierDto;

  @ApiProperty()
  @ValidateIf((o) => o.role === 'creator')
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateCreatorDto)
  creatorData?: CreateCreatorDto;

  @ApiProperty()
  @ValidateIf((o) => o.role === 'supplier')
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateSupplierDto)
  supplierData?: CreateSupplierDto;
}
