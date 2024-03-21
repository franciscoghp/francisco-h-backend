import { IsOptional, MaxLength, MinLength } from "class-validator";
import { User } from "src/database/entitys/User";


export class CreatePostDto {
    @MinLength(3)
    @MaxLength(20)
    message: string;

    @MinLength(3)
    @MaxLength(20)
    location: string;

    @MinLength(6)
    @MaxLength(20)
    username: string;

    @MinLength(6)
    @MaxLength(20)
    @IsOptional()
    likes: User[]

    @MinLength(6)
    @MaxLength(20)
    @IsOptional()
    author: User

    @IsOptional()
    image: string;
}
