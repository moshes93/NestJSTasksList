import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundFilter } from './filters/NotFoundFilter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TasksModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter
    }
  ]
})
export class AppModule {}
