// src/users/users.controller.ts

import { Body, Controller, Post, Get, Put, Param, ParseUUIDPipe, Query, DefaultValuePipe, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.usersService.findAll(page, limit);
  }

  @Get(':id')
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
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
