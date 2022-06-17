import { HttpException, Injectable } from '@nestjs/common';
import { TodoDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  public async getTodos() {
    // get all todos
    const getTodos = await this.prisma.todo.findMany();
    if (!getTodos || !getTodos[0]) {
      throw new HttpException('Data Not found', 404);
    }
    return getTodos;
  }

  public async postTodo(dto: TodoDto) {
    // Add to do
    console.log({ dto });
    const postTodo = await this.prisma.todo.create({
      data: {
        title: dto.title,
        description: dto.description,
        deadline: dto.deadline,
        complete: false,
        todo_id: uuidv4(),
      },
    });
    return postTodo;
  }

  public async getTodoById(id: string): Promise<any> {
    // get specific todo
    const getTodo = await this.prisma.todo.findUnique({
      where: {
        todo_id: id,
      },
    });
    if (!getTodo) {
      throw new HttpException('Not found', 404);
    }
    return getTodo;
  }

  public async deleteTodoById(id: string): Promise<any> {
    // delete specific todo
    const deleteTodo = await this.prisma.todo.delete({
      where: {
        todo_id: id,
      },
    });
    if (!deleteTodo) {
      throw new HttpException('This data might be deleted or missing', 404);
    }
    return deleteTodo;
  }

  public async putTodo(dto: TodoDto): Promise<any> {
    //update specific todo
    const updateTodo = await this.prisma.todo.update({
      where: {
        todo_id: dto.todo_id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        deadline: dto.deadline,
        complete: dto.complete,
      },
    });

    if (!updateTodo) {
      throw new HttpException('Update error', 404);
    }
    return updateTodo;
  }
}
