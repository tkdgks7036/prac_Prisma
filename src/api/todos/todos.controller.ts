import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, HttpCode, UseInterceptors } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseTransformInterceptor } from 'src/etc/interceptors/transform.interceptor';
import { ResponseMsg } from 'src/etc/decorators/response.message';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  //create
  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Created successfully`)
  @ApiOkResponse({ description: 'Created successfully', type: CreateTodoDto })
  @ApiForbiddenResponse({ description: 'Created failed' })
  @ApiOperation({
    summary: 'Created todo',
    description: 'Created 1 todo',
    deprecated: false,
    externalDocs: {
      description: 'Swagger in NestJS Docs',
      url: 'https://docs.nestjs.com/openapi/introduction'
    }
  })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createTodo = await this.todosService.create(createTodoDto);

    return createTodo;
  }

  //read
  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`All list fetched successfully`)
  @ApiOkResponse({ description: 'All list fetched successfully', type: CreateTodoDto })
  @ApiForbiddenResponse({ description: 'Fetched failed' })
  @ApiOperation({
    summary: 'Fetched All todos',
    description: 'Fetched All todos',
    deprecated: false,
    externalDocs: {
      description: 'Swagger in NestJS Docs',
      url: 'https://docs.nestjs.com/openapi/introduction'
    }
  })
  async findAll() {
    const fetchTodo = await this.todosService.findAll();

    return fetchTodo;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Fetched specific todo successfully`)
  @ApiOkResponse({ description: `Fetched specific todo successfully`, type: CreateTodoDto })
  @ApiForbiddenResponse({ description: `Fetched specific todo failed` })
  @ApiOperation({
    summary: 'Fetched specific todo',
    description: 'Fetched specific todo',
    deprecated: false,
    externalDocs: {
      description: 'Swagger in NestJS Docs',
      url: 'https://docs.nestjs.com/openapi/introduction'
    }
  })
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
  @ResponseMsg(`Updated specific todo successfully`)
  @ApiOkResponse({ description: `Updated specific todo successfully`, type: UpdateTodoDto })
  @ApiForbiddenResponse({ description: 'Updated failed' })
  @ApiOperation({
    summary: 'Updated specific todo',
    description: 'Updated specific todo',
    deprecated: false,
    externalDocs: {
      description: 'Swagger in NestJS Docs',
      url: 'https://docs.nestjs.com/openapi/introduction'
    }
  })
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
  @ResponseMsg(`Deleted specific todo successfully`)
  @ApiOkResponse({ description: `Deleted specific todo successfully`, type: CreateTodoDto })
  @ApiForbiddenResponse({ description: 'Deleted failed' })
  @ApiOperation({
    summary: 'Deleted specific todo',
    description: 'Deleted specific todo',
    deprecated: false,
    externalDocs: {
      description: 'Swagger in NestJS Docs',
      url: 'https://docs.nestjs.com/openapi/introduction'
    }
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }
    const deleteTodo = await this.todosService.remove(+id);

    return deleteTodo;
  }
}
