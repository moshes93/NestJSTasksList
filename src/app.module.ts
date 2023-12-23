import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundFilter } from './filters/NotFoundFilter';

@Module({
  imports: [TasksModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter
    }
  ]
})
export class AppModule {}
