import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ImageOrderDto {
  @ApiProperty()
  @IsUUID()
  imageId: string;

  @ApiProperty()
  @IsNumber()
  orderIndex: number;
}

export class ResortImagesDto {
  @ApiProperty({ type: [ImageOrderDto] })
  //   @Type(() => FileDto[])
  @ValidateNested({ each: true })
  //   @IsNotEmpty()
  imageOrderArr: ImageOrderDto[];
}
