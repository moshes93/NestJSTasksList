import { Module } from '@nestjs/common';
import { ExecModule } from './exec/exec.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundFilter } from './filters/NotFoundFilter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ExecModule,
    TaskModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter
    }
  ]
})
export class AppModule {}
