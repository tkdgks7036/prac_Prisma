import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, HttpCode, UseInterceptors } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseTransformInterceptor } from 'src/etc/interceptors/transform.interceptor';
import { ResponseMsg } from 'src/etc/decorators/response.message';

@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  //create
  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Created successfully`)
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createTodo = await this.todosService.create(createTodoDto);

    return createTodo;
  }

  //read
  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`All list fetched successfully`)
  async findAll() {
    const fetchTodo = await this.todosService.findAll();

    return fetchTodo;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`fetched successfully`)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const findTodo = await this.todosService.findOne(+id);
    if (findTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }

    return findTodo;
  }

  //update
  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Updated successfully`)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
    const findTodo = await this.todosService.findOne(+id);
    if (findTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }
    const updateTodo = await this.todosService.update(+id, updateTodoDto);

    return updateTodo;
  }

  //delete
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Deleted successfully`)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }
    const deleteTodo = await this.todosService.remove(+id);

    return deleteTodo;
  }
}
