import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/provider/prisma.service';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(courseId: string, createAnnouncementDto: CreateAnnouncementDto) {
    try {
      const courseExists = await this.prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!courseExists) {
        throw new NotFoundException('Curso no encontrado');
      }

      const announcement = await this.prisma.announcement.create({
        data: {
          ...createAnnouncementDto,
          courseId,
        },
      });

      return {
        message: 'Anuncio creado exitosamente',
        announcement,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el anuncio');
    }
  }

  async findAll(courseId: string, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [announcements, total] = await Promise.all([
        this.prisma.announcement.findMany({
          where: { courseId },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' }, // Los más recientes primero
        }),
        this.prisma.announcement.count({
          where: { courseId },
        }),
      ]);

      return {
        message: 'Anuncios encontrados exitosamente',
        announcements,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los anuncios');
    }
  }

  async findById(courseId: string, announcementId: string) {
    try {
      const announcement = await this.prisma.announcement.findFirst({
        where: {
          id: announcementId,
          courseId,
        },
      });

      if (!announcement) {
        throw new NotFoundException('Anuncio no encontrado');
      }

      return {
        message: 'Anuncio encontrado exitosamente',
        announcement,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar el anuncio');
    }
  }

  async update(courseId: string, announcementId: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    try {
      const announcement = await this.prisma.announcement.findFirst({
        where: {
          id: announcementId,
          courseId,
        },
      });

      if (!announcement) {
        throw new NotFoundException('Anuncio no encontrado');
      }

      const updatedAnnouncement = await this.prisma.announcement.update({
        where: { id: announcementId },
        data: updateAnnouncementDto,
      });

      return {
        message: 'Anuncio actualizado exitosamente',
        announcement: updatedAnnouncement,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el anuncio');
    }
  }

  async remove(courseId: string, announcementId: string) {
    try {
      const announcement = await this.prisma.announcement.findFirst({
        where: {
          id: announcementId,
          courseId,
        },
      });

      if (!announcement) {
        throw new NotFoundException('Anuncio no encontrado');
      }

      await this.prisma.announcement.delete({
        where: { id: announcementId },
      });

      return {
        message: 'Anuncio eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el anuncio');
    }
  }
}
