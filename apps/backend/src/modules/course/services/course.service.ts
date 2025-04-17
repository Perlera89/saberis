import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/provider/prisma.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const { title, courseCode, description, academicPeriod, credits, classroomNumber, preRequisite } = createCourseDto;

    try {
      const newCourse = await this.prisma.course.create({
        data: {
          title,
          courseCode,
          description,
          academicPeriod,
          credits,
          classroomNumber,
          preRequisite,
        },
      });

      return {
        message: 'Curso creado exitosamente',
        course: {
          id: newCourse.id,
          title: newCourse.title,
          courseCode: newCourse.courseCode,
          academicPeriod: newCourse.academicPeriod,
          credits: newCourse.credits,
          createdAt: newCourse.createdAt,
        },
      };
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('course_code')) {
        throw new ConflictException('El código del curso ya está registrado');
      }
      throw new InternalServerErrorException('Error al crear el curso');
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [courses, total] = await Promise.all([
        this.prisma.course.findMany({
          select: {
            id: true,
            title: true,
            courseCode: true,
            description: true,
            academicPeriod: true,
            credits: true,
            classroomNumber: true,
            createdAt: true,
            classification: {
              select: {
                category: true,
                subcategory: true,
              },
            },
          },
          skip,
          take: limit,
        }),
        this.prisma.course.count(),
      ]);

      return {
        message: 'Cursos encontrados exitosamente',
        courses,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los cursos');
    }
  }

  async findById(id: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          courseCode: true,
          description: true,
          academicPeriod: true,
          credits: true,
          classroomNumber: true,
          preRequisite: true,
          createdAt: true,
          classification: {
            select: {
              category: true,
              subcategory: true,
            },
          },
          CourseSchedules: true,
          instructorCoursesProfile: {
            select: {
              instructor: {
                select: {
                  names: true,
                  surnames: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      if (!course) {
        throw new NotFoundException('Curso no encontrado');
      }

      return {
        message: 'Curso encontrado exitosamente',
        course,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar el curso');
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      const courseExists = await this.prisma.course.findUnique({
        where: { id },
      });

      if (!courseExists) {
        throw new NotFoundException('Curso no encontrado');
      }

      const updatedCourse = await this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
        select: {
          id: true,
          title: true,
          courseCode: true,
          description: true,
          academicPeriod: true,
          credits: true,
          classroomNumber: true,
          preRequisite: true,
          createdAt: true,
        },
      });

      return {
        message: 'Curso actualizado exitosamente',
        course: updatedCourse,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('course_code')) {
        throw new ConflictException('El código del curso ya está registrado');
      }
      throw new InternalServerErrorException('Error al actualizar el curso');
    }
  }
}
