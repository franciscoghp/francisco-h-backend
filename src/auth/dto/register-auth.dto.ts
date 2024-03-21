import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @MinLength(3)
  @MaxLength(20)
  surname: string;

  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsOptional()
  avatar: string;
}
