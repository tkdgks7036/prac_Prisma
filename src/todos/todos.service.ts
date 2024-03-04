import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {

  //create
  create(createTodoDto: CreateTodoDto) {
    return `This action adds a new todo
    todo : ${createTodoDto.todo}
    is_doen: ${createTodoDto.is_doen}`;
  }

  //read
  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  //update
  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action adds a new todo
    todo : ${updateTodoDto.todo}
    is_doen: ${updateTodoDto.is_doen}`;
  }

  //delete
  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
