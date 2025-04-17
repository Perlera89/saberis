import { PartialType } from '@nestjs/swagger';
import { CreateSectionContentDto } from './create-content.dto';

export class UpdateSectionContentDto extends PartialType(CreateSectionContentDto) {}