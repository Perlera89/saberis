import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AnnouncementService } from '../services/announcement.service';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';

@Controller('courses/:courseId/announcements')
@ApiTags('Anuncios de Cursos')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo anuncio' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiResponse({ status: 201, description: 'Anuncio creado exitosamente' })
  async create(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    return await this.announcementService.create(courseId, createAnnouncementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los anuncios de un curso' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.announcementService.findAll(courseId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un anuncio específico' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiParam({ name: 'id', description: 'ID del anuncio' })
  async findById(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.announcementService.findById(courseId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un anuncio' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiParam({ name: 'id', description: 'ID del anuncio' })
  async update(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return await this.announcementService.update(courseId, id, updateAnnouncementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un anuncio' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiParam({ name: 'id', description: 'ID del anuncio' })
  async remove(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.announcementService.remove(courseId, id);
  }
}
