import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoDto } from 'src/dto';
import { TodoService } from './todo.service';

@Controller('todo') // /todo
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get() // path: GET /todo
  public getTodos() {
    return this.todoService.getTodos();
  }

  @Post() // path: POST /todo
  public postTodo(@Body() todo: TodoDto) {
    console.log(todo);
    return this.todoService.postTodo(todo);
  }

  @Put('') // path: PUT /todo
  public async putTodo(@Body() todo: TodoDto) {
    return this.todoService.putTodo(todo);
  }

  @Get(':id') // path: GET /todo/:id
  public async getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }

  @Delete(':id') // path: DELETE /todo/:id
  public async deleteTodoById(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }
}
