import { IsEmail, IsOptional, IsEnum, MinLength, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email no es válido' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'El rol debe ser uno de los siguientes: admin, teacher, student',
  })
  role?: UserRole;
}
