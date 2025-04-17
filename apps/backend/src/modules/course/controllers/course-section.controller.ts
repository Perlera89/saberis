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
import { CourseSectionService } from '../services/course-section.service';
import { CreateCourseSectionDto } from '../dto/create-section.dto';
import { UpdateCourseSectionDto } from '../dto/update-section.dto';

@Controller('courses/:courseId/sections')
@ApiTags('Secciones de Cursos')
export class CourseSectionController {
  constructor(private readonly sectionService: CourseSectionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva sección del curso' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiResponse({ status: 201, description: 'Sección creada exitosamente' })
  async create(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() createSectionDto: CreateCourseSectionDto,
  ) {
    return await this.sectionService.create(courseId, createSectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las secciones de un curso' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.sectionService.findAll(courseId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sección específica' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiParam({ name: 'id', description: 'ID de la sección' })
  async findById(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.sectionService.findById(courseId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una sección' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiParam({ name: 'id', description: 'ID de la sección' })
  async update(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSectionDto: UpdateCourseSectionDto,
  ) {
    return await this.sectionService.update(courseId, id, updateSectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una sección' })
  @ApiParam({ name: 'courseId', description: 'ID del curso' })
  @ApiParam({ name: 'id', description: 'ID de la sección' })
  async remove(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.sectionService.remove(courseId, id);
  }
}
