import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CourseCategoryService } from '../services/course-category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('categories')
@ApiTags('Categorías de Cursos')
export class CourseCategoryController {
    constructor(private readonly categoryService: CourseCategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiBody({ type: CreateCategoryDto })
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorías' })
    async findAllCategories(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    ) {
        return await this.categoryService.findAllCategories({
            skip,
            take,
            orderBy: {
                name: 'asc',
            }
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoría por ID' })
    async findCategoryById(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.findCategoryById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una categoría' })
    @ApiBody({ type: UpdateCategoryDto })
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return await this.categoryService.updateCategory(id, updateCategoryDto);
    }
}
