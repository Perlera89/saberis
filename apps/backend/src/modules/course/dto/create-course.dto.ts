import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
    @ApiProperty({ example: 'Introducción a la Programación' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'PROG101' })
    @IsString()
    @IsNotEmpty()
    courseCode: string;

    @ApiProperty({ example: 'Curso básico de programación' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '2024-1' })
    @IsString()
    @IsNotEmpty()
    academicPeriod: string;

    @ApiProperty({ example: 4 })
    @IsInt()
    @Min(1)
    credits: number;

    @ApiProperty({ example: 'A101' })
    @IsString()
    @IsNotEmpty()
    classroomNumber: string;

    @ApiProperty({ example: 'Ninguno', required: false })
    @IsString()
    @IsOptional()
    preRequisite?: string;
}