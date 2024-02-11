import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  //!create post
  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  @Get()
  getPost() {
    return this.postService.getPost();
  }
}
