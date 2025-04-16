import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [UsersModule, AuthModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
