import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  //!create user
  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
      relations: ['posts'],
    });

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  //!get users

  getUsers() {
    return this.userRepository.find();
  }

  //!get user

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  //!delete user

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id: id });

    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  //!update  user

  async updatedUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);

    return this.userRepository.save(updateUser);
  }

  //!create profile
  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    userFound.profile = savedProfile;
    return this.userRepository.save(userFound);
  }
}
