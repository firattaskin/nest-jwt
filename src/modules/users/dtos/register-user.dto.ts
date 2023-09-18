import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6) // Şifre en az 6 karakter olmalıdır
  password: string;
}
