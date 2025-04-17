import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, CourseCategory } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/common/provider/prisma.service';


@Injectable()
export class CourseCategoryService {

    private readonly _prismaService: PrismaService;

    constructor(prismaService: PrismaService) {

        this._prismaService = prismaService;
    }

    async createCategory(data: Prisma.CourseCategoryCreateInput): Promise<CourseCategory> {
        return await this._prismaService.courseCategory.create({
            data
        });
    }

    async findAllCategories(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CourseCategoryWhereUniqueInput;
        where?: Prisma.CourseCategoryWhereInput;
        orderBy?: Prisma.CourseCategoryOrderByWithRelationInput;
    }): Promise<CourseCategory[]> {
        return await this._prismaService.courseCategory.findMany({
            ...params
        });
    }

    async findCategoryById(id: number) {

        if (!id) {
            throw new Error('ID is required');
        }
        try {
            const category = await this._prismaService.courseCategory.findUnique({
                where: { id }
            });

            if (!category) {
                throw new Error('Category not found');
            }

            return {
                message: 'Category found',
                category
            };
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new InternalServerErrorException('Error al buscar el usuario');
        }
    }

    async updateCategory(id: number, data: Prisma.CourseCategoryUpdateInput): Promise<CourseCategory> {
        return await this._prismaService.courseCategory.update({
            where: { id },
            data
        });
    }   
}