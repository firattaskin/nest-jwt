import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/modules/users/dtos/login-user.dto';
import { RegisterUserDto } from 'src/modules/users/dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/modules/users/users.entity';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  logIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.logIn(loginUserDto);
  }

  @Post('/register')
  @Serialize(UserDto)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.create(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
