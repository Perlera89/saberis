// src/users/users.controller.ts

import { Body, Controller, Post, Get, Put, Param, ParseUUIDPipe, Query, DefaultValuePipe, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        name: { type: 'string', example: 'Juan Pérez' },
        email: { type: 'string', example: 'juan@example.com' },
        password: { type: 'string', example: 'P@ssw0rd!' },
        role: { type: 'string', example: 'admin' },
      },
      example: {
        id: '',
        name: '',
        email: '',
        password: '',
        role: 'student',
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }


  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios con paginado' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.usersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findById(id);
  }

  @Post(':id/validate-password')
  async validatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('password') password: string,
  ) {
    if (!password) {
      throw new BadRequestException('La contraseña es requerida');
    }
    return await this.usersService.validatePassword(id, password);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        name: { type: 'string', example: 'Juan Pérez' },
        email: { type: 'string', example: 'juan@example.com' },
        password: { type: 'string', example: 'P@ssw0rd!' },
        role: { type: 'string', example: 'admin' },
      },
      example: {
        id: '',
        name: '',
        email: '',
        password: '',
        role: '',
      },
    },
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}

