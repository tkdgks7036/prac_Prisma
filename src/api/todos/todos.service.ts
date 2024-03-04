import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) { }

  //create
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        isDone: createTodoDto.is_doen,
      },
    })
  }

  //read
  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    return this.prisma.todo.findUnique({
      where: {
        id
      }
    })
  }

  //update
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        isDone: updateTodoDto.is_doen,
      },
    })
  }

  //delete
  async remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: {
        id
      }
    })
  }
}
