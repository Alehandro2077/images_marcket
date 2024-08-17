import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FileDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  mimeType: string;
}

export class FilesArrayDto {
  @ApiProperty({ type: [FileDto] })
  //   @Type(() => FileDto[])
  @ValidateNested({ each: true })
  files: FileDto[];
}
