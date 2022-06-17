import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  todo_id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  deadline?: string;

  @IsBoolean()
  @IsNotEmpty()
  complete: boolean;
}
