import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email valid requeried' })
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}
