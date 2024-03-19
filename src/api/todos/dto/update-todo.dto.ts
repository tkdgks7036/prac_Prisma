import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength, MaxLength, IsBoolean } from "class-validator"

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    type: Number,
    description: 'Todo`s id number',
    example: 1
  })
  id: number;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Todo`s update title',
    example: 'NestJS update practice',
    default: 'Default update title',
    minimum: 6,
    maximum: 30
  })
  @IsString({
    message: `Title type must be string.`
  })
  @MinLength(5, {
    message: `Title must be at least 5 characters long.`
  })
  @MaxLength(30, {
    message: `Title can be up to 30 characters long.`
  })
  title: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'Todo update`s check - done',
    example: 'false',
    default: false
  })
  @IsBoolean({
    message: `Writing must be of Boolean type.`
  })
  isDone: boolean;

  @ApiProperty({
    type: Date,
    description: 'Todo create date',
    example: '2024-03-04T21:04:26.000Z'
  })
  createdAt?: Date;

  @ApiProperty({
    type: Date,
    description: 'Todo update date',
    example: '2024-03-04T12:29:31.938Z'
  })
  updatedAt?: Date;
}
