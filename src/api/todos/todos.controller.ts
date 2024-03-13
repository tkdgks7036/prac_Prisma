import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  //create
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createTodo = await this.todosService.create(createTodoDto);

    return {
      message: `Created successfully`,
      statusCode: 200,
      data: createTodo
    }
  }

  //read
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const fetchTodo = await this.todosService.findAll();

    return {
      message: `Fetched successfully`,
      statusCode: 200,
      data: fetchTodo
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const findTodo = await this.todosService.findOne(+id);
    if (findTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }

    return {
      message: `${id} todo fetched successfully`,
      statusCode: 200,
      data: findTodo
    }
  }

  //update
  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
    const findTodo = await this.todosService.findOne(+id);
    if (findTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }
    const updateTodo = await this.todosService.update(+id, updateTodoDto);

    return {
      message: `${id} todo updated successfully`,
      statusCode: 200,
      data: updateTodo
    }
  }

  //delete
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }
    const deleteTodo = await this.todosService.remove(+id);

    return {
      message: `${id} todo deleted successfully`,
      statusCode: 200,
      data: deleteTodo
    }
  }
}
