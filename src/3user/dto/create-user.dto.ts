import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, NotContains } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class CreateUserDtoWithPassword extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @NotContains(' ')
  password: string;
}
