import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '.././auth/entities/user.entity';
import { Auth, GetUser } from '.././auth/decorators';
import { PaginationDto } from 'src/common/DTOs/pagination.module';
import { validRoles } from 'src/auth/interfaces';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user:User)
    {   
    return this.taskService.create(createTaskDto,user);
  }

  @Get()
  findAll(@Query() paginacionDto: PaginationDto) {

    return this.taskService.findAll(paginacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  //TIENE QUE ESTAR AUTH CON EL USUARIO Y ROL PARA QUE FUNCIONE. DESPUES LLAMO AL DECORADOR @GetUser
  @Patch(':id')
  @Auth(validRoles.admin)
  update(
    @Param('id',ParseUUIDPipe) id: string, 
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
    ){
    return this.taskService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.taskService.remove(id);
  }
}
