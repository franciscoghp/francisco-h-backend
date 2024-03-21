import { Controller, Get, Post, Body, Param, Delete, Put} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/like-post.dto';
import { User } from 'src/database/entitys/User';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findByUserPublished(@Param('id') id: string) {
    return this.postService.findByUserPublished(+id);
  }
  @Get('/all/:id')
  findByUserAll(@Param('id') id: string) {
    return this.postService.findByUser(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Put('/like/:id')
  like(@Param('id') id: string, @Body() updatePostDto: User) {
    return this.postService.like(+id, updatePostDto);
  }

  @Put('/dislike/:id')
  dislike(@Param('id') id: string, @Body() updatePostDto: User) {
    return this.postService.dislike(+id, updatePostDto);
  }
  @Put('/aproved/:id')
  aprovedPost(@Param('id') id: string) {
    return this.postService.aprovedPost(+id);
  }

  @Put('/reject/:id')
  rejectPost(@Param('id') id: string) {
    return this.postService.rejectPost(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

