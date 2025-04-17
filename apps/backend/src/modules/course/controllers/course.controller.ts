import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  ParseUUIDPipe, 
  Query, 
  DefaultValuePipe, 
  ParseIntPipe 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CourseService } from '../services/course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Controller('courses')
@ApiTags('Cursos')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({
    status: 201,
    description: 'El curso ha sido creado exitosamente'
  })
  async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.courseService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiResponse({
    status: 200,
    description: 'Curso encontrado exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Curso no encontrado'
  })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.courseService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({
    status: 200,
    description: 'Curso actualizado exitosamente'
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.courseService.update(id, updateCourseDto);
  }
}
