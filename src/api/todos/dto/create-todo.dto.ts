import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTodoDto {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Todo`s title',
    example: 'NestJS practice',
    default: '',
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
    description: 'Todo check done',
    example: 'false',
    default: false
  })
  @IsBoolean({
    message: `Writing must be of Boolean type.`
  })
  is_done: boolean;
}
