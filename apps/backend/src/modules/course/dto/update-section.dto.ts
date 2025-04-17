import { PartialType } from '@nestjs/swagger';
import { CreateCourseSectionDto } from './create-section.dto';

export class UpdateCourseSectionDto extends PartialType(CreateCourseSectionDto) {}