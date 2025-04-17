import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseSectionDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(52)
  weekNumber?: number;

  @ApiProperty({ example: 'Introducción a la Programación' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'En esta sección aprenderemos los fundamentos...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '01/03/2024 - 07/03/2024', required: false })
  @IsOptional()
  @IsString()
  dateRange?: string;
}