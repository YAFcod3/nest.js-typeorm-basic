import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createPost(post: CreatePostDto) {
    const userFound = await this.usersService.getUser(post.authorId);

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.postsRepository.create(post);

    return await this.postsRepository.save(newPost);
  }

  getPost() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }
}
