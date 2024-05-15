import { IsString, Length, IsStrongPassword, IsNotEmpty } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
