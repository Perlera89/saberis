import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SectionContentService } from '../services/section-content.service';
import { CreateSectionContentDto } from '../dto/create-content.dto';
import { UpdateSectionContentDto } from '../dto/update-content.dto';

@Controller('courses/:courseId/sections/:sectionId/contents')
@ApiTags('Contenido de Secciones')
export class SectionContentController {
  constructor(private readonly contentService: SectionContentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo contenido para una sección' })
  @ApiParam({ name: 'sectionId', description: 'ID de la sección' })
  @ApiResponse({ status: 201, description: 'Contenido creado exitosamente' })
  async create(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Body() createContentDto: CreateSectionContentDto,
  ) {
    return await this.contentService.create(sectionId, createContentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todo el contenido de una sección' })
  @ApiParam({ name: 'sectionId', description: 'ID de la sección' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.contentService.findAll(sectionId, page, limit);
  }

  @Get(':contentId')
  @ApiOperation({ summary: 'Obtener un contenido específico' })
  @ApiParam({ name: 'sectionId', description: 'ID de la sección' })
  @ApiParam({ name: 'contentId', description: 'ID del contenido' })
  async findById(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('contentId', ParseUUIDPipe) contentId: string,
  ) {
    return await this.contentService.findById(sectionId, contentId);
  }

  @Put(':contentId')
  @ApiOperation({ summary: 'Actualizar un contenido' })
  @ApiParam({ name: 'sectionId', description: 'ID de la sección' })
  @ApiParam({ name: 'contentId', description: 'ID del contenido' })
  async update(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('contentId', ParseUUIDPipe) contentId: string,
    @Body() updateContentDto: UpdateSectionContentDto,
  ) {
    return await this.contentService.update(sectionId, contentId, updateContentDto);
  }

  @Delete(':contentId')
  @ApiOperation({ summary: 'Eliminar un contenido' })
  @ApiParam({ name: 'sectionId', description: 'ID de la sección' })
  @ApiParam({ name: 'contentId', description: 'ID del contenido' })
  async remove(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Param('contentId', ParseUUIDPipe) contentId: string,
  ) {
    return await this.contentService.remove(sectionId, contentId);
  }
}
