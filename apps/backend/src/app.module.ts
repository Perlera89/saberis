import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [UsersModule, AuthModule, CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
