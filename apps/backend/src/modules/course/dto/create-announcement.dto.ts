import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AnnouncementType } from '@prisma/client';

export class CreateAnnouncementDto {
  @ApiProperty({ example: 'Cambio de horario' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'La clase del martes se moverá a las 3pm' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    enum: AnnouncementType, 
    example: AnnouncementType.Normal,
    default: AnnouncementType.Normal 
  })
  @IsEnum(AnnouncementType)
  type: AnnouncementType;
}