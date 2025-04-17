import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/provider/prisma.service';
import { CreateSectionContentDto } from '../dto/create-content.dto';
import { UpdateSectionContentDto } from '../dto/update-content.dto';

@Injectable()
export class SectionContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(sectionId: string, createContentDto: CreateSectionContentDto) {
    try {
      // Verificar si la sección existe
      const sectionExists = await this.prisma.courseSection.findUnique({
        where: { id: sectionId },
      });

      if (!sectionExists) {
        throw new NotFoundException('Sección no encontrada');
      }

      const newContent = await this.prisma.sectionContent.create({
        data: {
          ...createContentDto,
          sectionId,
        },
      });

      return {
        message: 'Contenido creado exitosamente',
        content: newContent,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el contenido');
    }
  }

  async findAll(sectionId: string, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [contents, total] = await Promise.all([
        this.prisma.sectionContent.findMany({
          where: { sectionId },
          skip,
          take: limit,
          orderBy: { createdAt: 'asc' },
        }),
        this.prisma.sectionContent.count({
          where: { sectionId },
        }),
      ]);

      return {
        message: 'Contenidos encontrados exitosamente',
        contents,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los contenidos');
    }
  }

  async findById(sectionId: string, contentId: string) {
    try {
      const content = await this.prisma.sectionContent.findFirst({
        where: {
          id: contentId,
          sectionId,
        },
      });

      if (!content) {
        throw new NotFoundException('Contenido no encontrado');
      }

      return {
        message: 'Contenido encontrado exitosamente',
        content,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar el contenido');
    }
  }

  async update(sectionId: string, contentId: string, updateContentDto: UpdateSectionContentDto) {
    try {
      const contentExists = await this.prisma.sectionContent.findFirst({
        where: {
          id: contentId,
          sectionId,
        },
      });

      if (!contentExists) {
        throw new NotFoundException('Contenido no encontrado');
      }

      const updatedContent = await this.prisma.sectionContent.update({
        where: { id: contentId },
        data: updateContentDto,
      });

      return {
        message: 'Contenido actualizado exitosamente',
        content: updatedContent,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el contenido');
    }
  }

  async remove(sectionId: string, contentId: string) {
    try {
      const contentExists = await this.prisma.sectionContent.findFirst({
        where: {
          id: contentId,
          sectionId,
        },
      });

      if (!contentExists) {
        throw new NotFoundException('Contenido no encontrado');
      }

      await this.prisma.sectionContent.delete({
        where: { id: contentId },
      });

      return {
        message: 'Contenido eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el contenido');
    }
  }
}
