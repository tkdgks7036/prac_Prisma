import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTodoDto {
  @IsString({
    message: `Title type must be string.`
  })
  @MinLength(5, {
    message: `Title must be at least 5 characters long.`
  })
  @MaxLength(10, {
    message: `Title can be up to 30 characters long.`
  })
  title: string;

  @IsBoolean({
    message: `Writing must be of Boolean type.`
  })
  is_doen: boolean;
}
