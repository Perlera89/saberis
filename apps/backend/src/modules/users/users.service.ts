import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/provider/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, role } = createUserDto;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          passwordHash,
          role,
        },
      });

      return {
        message: 'Usuario creado exitosamente',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      };
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }

      throw new InternalServerErrorException('Ocurrió un error inesperado al crear el usuario');
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
          skip,
          take: limit,
        }),
        this.prisma.user.count(),
      ]);

      return {
        message: 'Usuarios encontrados exitosamente',
        users,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return {
        message: 'Usuario encontrado exitosamente',
        user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }

  async validatePassword(id: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          passwordHash: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return {
          message: 'Contraseña incorrecta',
          isValid: false,
        };
      }

      return {
        message: 'Contraseña válida',
        isValid: true,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al validar la contraseña');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      // Verificar si el usuario existe
      const userExists = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!userExists) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Si se incluye password, hashearlo
      let passwordHash;
      if (updateUserDto.password) {
        passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          ...(passwordHash && { passwordHash }),
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return {
        message: 'Usuario actualizado exitosamente',
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }
}
