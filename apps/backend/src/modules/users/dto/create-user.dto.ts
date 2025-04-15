// src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'El rol debe ser uno de los siguientes: admin, teacher, student',
  })
  role?: UserRole;
}
