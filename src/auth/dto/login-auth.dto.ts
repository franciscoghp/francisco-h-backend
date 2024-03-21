import { MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {

  @MinLength(6)
  @MaxLength(20)
  username: string;
}
