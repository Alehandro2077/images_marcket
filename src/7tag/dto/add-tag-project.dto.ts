import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { AssignTagDto } from './assign-tag.dto';
import { Type } from 'class-transformer';

export class AddTagProjectDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  tagId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title: string;
}
