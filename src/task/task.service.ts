import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from 'src/common/DTOs/pagination.module';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository:Repository<Task>,
  ){}

  async create(createTaskDto:CreateTaskDto, user:User) {
    try {
      const taskDetails = createTaskDto;
      
      const task = this.taskRepository.create({
        ...taskDetails,
        user,
        }
        );
      
      await this.taskRepository.save(task);

      return task;

    } catch (error) {
      console.log(error);
    }

    
  }

  findAll(paginacionDto:PaginationDto) {
    const {limit=10,offset=0,statu='SIN COMENZAR'} = paginacionDto;
    const task = this.taskRepository.find({
      take: limit,
      skip:offset,
      statu: statu,
    })
    return task;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id:string, updateTaskDto:UpdateTaskDto, user:User) {
    //actualizar statu o descripcion
    
    const task = await this.taskRepository.preload({
      id:id,
      ...updateTaskDto,
      user
    });

    if(!task){
      throw new NotFoundException(`Task with id ${id} was not found`)
    }

    try {
      
      await this.taskRepository.save(task);
      return task;
    
    } catch (error) {
      return `please, check logs`
    }  
  }

  async remove(id: string) {
    const {statu,...task} = await this.taskRepository.preload({
      id:id,
      statu: "ELIMINADA",
    });

    await this.taskRepository.save({statu,...task});

    return `Task with id ${id} changes statu to delete`;
  }
}
