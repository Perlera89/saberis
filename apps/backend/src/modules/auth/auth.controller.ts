import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtGuard } from './guards/jwt.guard';
import { GetUser } from './decorators/get-user.decorator';
import { ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'juan@example.com' },
          password: { type: 'string', example: 'P@ssw0rd!' },
        },
        example: {
          email: '',
          password: '',
        },
      },
    })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Actualizar token en mantenimineto' })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @GetUser('id') userId: string,
  ) {
    return await this.authService.refreshToken(userId, refreshTokenDto.refresh_token);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  async logout(@GetUser('id') userId: string) {
    return await this.authService.logout(userId);
  }

  //vaidar token
  @Get('profile')
  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  @UseGuards(JwtGuard)
  getProfile(@GetUser() user) {
    return user;
  }

  
  @Post('validate-token')
  @ApiOperation({ summary: 'Validar token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'fergferfervrgv' },
      },
      example: {
        token: ''
      },
    },
  })
  async validateToken(@Body() body: { token: string }) {
    return await this.authService.validateToken(body.token);
  }
}
