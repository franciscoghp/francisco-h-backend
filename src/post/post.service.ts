import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/like-post.dto';
import { postData } from 'src/database/MOCK_DATA-POSTS';
import { Post, STATUS } from '../database/entitys/Post';
import { User } from 'src/database/entitys/User';

@Injectable()
export class PostService {
  public postsModel = postData;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  create(createPostDto: CreatePostDto) {
    try {
      const newUser = new Post();
      const maxId = this.postsModel.reduce((max, user) => (user.id > max ? user.id : max), -Infinity);


      newUser.id = maxId + 1;
      newUser.message  = createPostDto.message;
      newUser.location  = createPostDto.location;
      newUser.likes  = createPostDto.likes;
      newUser.author  = createPostDto.author;
      newUser.image  = createPostDto.image;
      // newUser.created_at  = new Date()

      this.postsModel.unshift(newUser);
      return newUser;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  findAll() {
    return this.postsModel;
  }

  findByUser(id: number) {
    const post = this.postsModel.filter( (post) => post.author.id == id);

    return post.sort((a, b) => {
      const fechaA: Date = new Date(a.created_at);
      const fechaB: Date = new Date(b.created_at);
      return fechaB.getTime() - fechaA.getTime();
    });
  }
  
  findByUserPublished(id: number) {
    let post = this.postsModel.filter( (post) => post.author.id == id);

     post = post.filter( (post) => {
      // console.log(post.status)
      return post.status == 'PUBLISHED'
     });

    return post.sort((a, b) => {
      const fechaA: Date = new Date(a.created_at);
      const fechaB: Date = new Date(b.created_at);
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.postsModel.filter( (post) => post.id == id)[0];
    Object.keys(updatePostDto).forEach(function(clave) {
      if (post.hasOwnProperty(clave)) {
          post[clave] = updatePostDto[clave];
      }
    });
    return post
  }

  remove(id: number) {
    this.postsModel = this.postsModel.filter(function(elemento) {
      return elemento.id !== id;
    });
    return 'Post Deleted Succesfully'
  }

  like(id: number, user: User) {
    const post = this.postsModel.filter( (post) => post.id == id)[0];
    post?.likes?.push(user)
    return post.likes
  }

  dislike(id: number, user: User) {
    const post = this.postsModel.filter( (post) => post.id == id)[0];
    post.likes = post?.likes?.filter(objeto => objeto.id !== user.id);
    return post.likes
  }
  aprovedPost(id: number) {
    const post = this.postsModel.filter( (post) => post.id == id)[0];
    post.status = 'PUBLISHED'
    return post
  }

  rejectPost(id: number) {
    const post = this.postsModel.filter( (post) => post.id == id)[0];
    post.status = 'DELETED'
    return post
  }
}
