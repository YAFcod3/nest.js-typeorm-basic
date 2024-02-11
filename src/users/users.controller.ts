import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersSevrice: UsersService) {}

  //!create user
  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<HttpException | User> {
    // await this.usersSevrice.createUser(newUser);
    return this.usersSevrice.createUser(newUser);
  }
  //!get users
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersSevrice.getUsers();
  }
  //!get user
  @Get(':id')
  getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HttpException | User> {
    return this.usersSevrice.getUser(id);
  }

  //!delete user
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersSevrice.deleteUser(id);
  }
  //!update  user
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersSevrice.updatedUser(id, user);
  }

  //!create profile
  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.usersSevrice.createProfile(id, profile);
  }
}
