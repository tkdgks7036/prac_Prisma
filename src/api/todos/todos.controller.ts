import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, HttpCode, UseInterceptors } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseTransformInterceptor } from 'src/etc/interceptors/transform.interceptor';
import { GenericApiResponse, ResponseMsg } from 'src/etc/decorators/response-decorators';
import { ApiExtraModels, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from './dto/response.dto';

@ApiTags('todos')
@ApiExtraModels(ResponseDto)
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  //create
  @Post()
  @ApiOperation({
    summary: 'Created 1 todo',
    deprecated: false,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Created successfully`)
  @GenericApiResponse({
    model: CreateTodoDto,
    status: 200,
    description: 'Created successfully',
    isArray: false
  })
  @ApiForbiddenResponse({ description: 'Created failed' })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createTodo = await this.todosService.create(createTodoDto);

    return createTodo;
  }

  //read
  @Get()
  @ApiOperation({
    summary: 'Fetched All todos',
    deprecated: false,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`All list fetched successfully`)
  @GenericApiResponse({
    model: CreateTodoDto,
    status: 200,
    description: 'All list fetched successfully',
    isArray: true
  })
  @ApiForbiddenResponse({ description: 'Fetched failed' })
  async findAll() {
    const fetchTodo = await this.todosService.findAll();

    return fetchTodo;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Fetched specific todo',
    deprecated: false,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Fetched specific todo successfully`)
  @GenericApiResponse({
    model: CreateTodoDto,
    status: 200,
    description: `Fetched specific todo successfully`
  })
  @ApiForbiddenResponse({ description: `Fetched specific todo failed` })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const findTodo = await this.todosService.findOne(+id);
    if (findTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }

    return findTodo;
  }

  //update
  @Post(':id')
  @ApiOperation({
    summary: 'Updated specific todo',
    deprecated: false,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Updated specific todo successfully`)
  @GenericApiResponse({
    model: UpdateTodoDto,
    status: 200,
    description: `Updated specific todo successfully`
  })
  @ApiForbiddenResponse({ description: 'Updated failed' })
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
  @ApiOperation({
    summary: 'Deleted specific todo',
    deprecated: false,
  })
  @HttpCode(HttpStatus.OK)
  @ResponseMsg(`Deleted specific todo successfully`)
  @GenericApiResponse({
    model: CreateTodoDto,
    status: 200,
    description: `Deleted specific todo successfully`
  })
  @ApiForbiddenResponse({ description: 'Deleted failed' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo == null) {
      throw new HttpException(`${id} todo is not existed`, HttpStatus.NOT_FOUND)
    }
    const deleteTodo = await this.todosService.remove(+id);

    return deleteTodo;
  }
}
