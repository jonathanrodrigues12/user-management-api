import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email valid requeried' })
  email: string;

  @ApiProperty()
  password: string;
}
