import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtGuard } from './guards/jwt.guard';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @GetUser('id') userId: string,
  ) {
    return await this.authService.refreshToken(userId, refreshTokenDto.refresh_token);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@GetUser('id') userId: string) {
    return await this.authService.logout(userId);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@GetUser() user) {
    return user;
  }

  @Post('validate-token')
  async validateToken(@Body() body: { token: string }) {
    return await this.authService.validateToken(body.token);
  }
}
