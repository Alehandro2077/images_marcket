import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTagDto {
  @ApiProperty()
  @IsUUID()
  tagId: string;

  @ApiProperty()
  @IsUUID()
  projectId: string;
}
