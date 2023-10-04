import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports:[
    TypeOrmModule.forFeature([Task]),
    AuthModule,
  ],
  exports:[
    TaskService,
    TypeOrmModule,
  ],
})
export class TaskModule {}
