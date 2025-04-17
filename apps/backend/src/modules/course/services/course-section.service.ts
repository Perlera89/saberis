import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/provider/prisma.service';
import { CreateCourseSectionDto } from '../dto/create-section.dto';
import { UpdateCourseSectionDto } from '../dto/update-section.dto';

@Injectable()
export class CourseSectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(courseId: string, createSectionDto: CreateCourseSectionDto) {
    try {
      // Verificar si el curso existe
      const courseExists = await this.prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!courseExists) {
        throw new NotFoundException('Curso no encontrado');
      }

      const newSection = await this.prisma.courseSection.create({
        data: {
          ...createSectionDto,
          courseId,
        },
        include: {
          sectionContent: true,
        },
      });

      return {
        message: 'Sección del curso creada exitosamente',
        section: newSection,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear la sección del curso');
    }
  }

  async findAll(courseId: string, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [sections, total] = await Promise.all([
        this.prisma.courseSection.findMany({
          where: {
            courseId,
          },
          include: {
            sectionContent: true,
          },
          skip,
          take: limit,
          orderBy: {
            weekNumber: 'asc',
          },
        }),
        this.prisma.courseSection.count({
          where: {
            courseId,
          },
        }),
      ]);

      return {
        message: 'Secciones encontradas exitosamente',
        sections,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las secciones del curso');
    }
  }

  async findById(courseId: string, sectionId: string) {
    try {
      const section = await this.prisma.courseSection.findFirst({
        where: {
          id: sectionId,
          courseId,
        },
        include: {
          sectionContent: true,
        },
      });

      if (!section) {
        throw new NotFoundException('Sección no encontrada');
      }

      return {
        message: 'Sección encontrada exitosamente',
        section,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar la sección');
    }
  }

  async update(courseId: string, sectionId: string, updateSectionDto: UpdateCourseSectionDto) {
    try {
      const sectionExists = await this.prisma.courseSection.findFirst({
        where: {
          id: sectionId,
          courseId,
        },
      });

      if (!sectionExists) {
        throw new NotFoundException('Sección no encontrada');
      }

      const updatedSection = await this.prisma.courseSection.update({
        where: {
          id: sectionId,
        },
        data: updateSectionDto,
        include: {
          sectionContent: true,
        },
      });

      return {
        message: 'Sección actualizada exitosamente',
        section: updatedSection,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar la sección');
    }
  }

  async remove(courseId: string, sectionId: string) {
    try {
      const sectionExists = await this.prisma.courseSection.findFirst({
        where: {
          id: sectionId,
          courseId,
        },
      });

      if (!sectionExists) {
        throw new NotFoundException('Sección no encontrada');
      }

      await this.prisma.courseSection.delete({
        where: {
          id: sectionId,
        },
      });

      return {
        message: 'Sección eliminada exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar la sección');
    }
  }
}
