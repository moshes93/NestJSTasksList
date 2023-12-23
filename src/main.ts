import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TasksService } from './tasks/tasks.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tasks Executer API')
    .setDescription('Swagger to help test the tasks services')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Create init data in db onload
  const tasksService = app.get(TasksService);
  await tasksService.createTask('Multiply Array', '')
  await tasksService.createTask('Sum Array', '')

  await app.listen(3000);
}
bootstrap();
