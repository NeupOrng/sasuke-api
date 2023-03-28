import { IsNotEmpty, IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReqeust {
  @ApiProperty({ name: "Username" })
  @IsNotEmpty()
  Username: string;

  @ApiProperty({ name: "Email" })
  @IsEmail()
  Email: string;

  @ApiProperty({ name: "Password" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
    message:
      'Password must contain at least one letter and one number and be between 8 and 16 characters long',
  })
  Password: string;
}

