import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatorDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  surname: string;
}
