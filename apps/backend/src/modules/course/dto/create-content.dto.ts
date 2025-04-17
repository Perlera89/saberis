import { IsNotEmpty, IsString, IsEnum, IsOptional, IsUrl, IsDate, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '@prisma/client';

export class CreateSectionContentDto {
  @ApiProperty({ example: 'Lectura 1: Introducción' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Contenido introductorio del tema' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: ResourceType, example: ResourceType.Documento })
  @IsEnum(ResourceType)
  type: ResourceType;

  @ApiProperty({ example: 'https://ejemplo.com/recurso', required: false })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  limitDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  timeLimit?: Date;
}