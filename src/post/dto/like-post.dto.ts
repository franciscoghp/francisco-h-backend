import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/database/entitys/User';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @MinLength(6)
    @MaxLength(20)
    @IsOptional()
    user: User
}
