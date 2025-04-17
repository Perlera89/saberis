import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './controllers/course.controller';
import { CourseCategoryService } from './services/course-category.service';
import { CourseCategoryController } from './controllers/course-category.controller';
import { PrismaService } from 'src/common/provider/prisma.service';
import { CourseSectionService } from './services/course-section.service';
import { AnnouncementController } from './controllers/announcement.controller';
import { AnnouncementService } from './services/announcement.service';
import { SectionContentService } from './services/section-content.service';
import { CourseSectionController } from './controllers/course-section.controller';
import { SectionContentController } from './controllers/section-content.controller';


@Module({
  controllers: [CourseController, CourseCategoryController, SectionContentController, CourseSectionController, AnnouncementController],
  providers: [PrismaService, CourseService, CourseCategoryService, CourseSectionService, SectionContentService, AnnouncementService],
  exports: [CourseService, CourseCategoryService],
})
export class CourseModule {}
