import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Programación',
        description: 'Nombre de la categoría'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({
        example: 'Cursos de programación y desarrollo de software',
        description: 'Descripción de la categoría'
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}