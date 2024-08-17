import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProjectDto {
  @ApiProperty()
  @IsString()
  searchString: string;
}
