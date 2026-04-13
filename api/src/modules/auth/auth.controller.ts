import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вхід та отримання JWT токену' })
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }
}
