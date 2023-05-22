import { Injectable, HttpException, HttpStatus,Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';
import { Posts, PostDocument } from './schema/post.schema';


@Injectable()
export class UsersService {

  constructor( @InjectModel(User.name) private userModel: Model<UserDocument> ,
  @InjectModel(Posts.name) private postModel: Model<PostDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> { 
            return  new this.userModel(createUserDto).save();
}

  async userLogin(createUserDto: User): Promise<User>  {
   // console.log(createUserDto);
    const user =  await  this.userModel.findOne({email:createUserDto.email, password:createUserDto.password});
    if(!user ){
      throw new HttpException('Not Found', 404);
    }
    return user;
  }

  async getUserById(userId:string) : Promise<User>{
    return  await this.userModel.findOne({_id:userId});
  }

  async findAll() {
    return  this.userModel.find();
  }

  async uploadPost(createUserDto: any): Promise<Posts> {
    const newPost = new this.postModel(createUserDto).save();
    if(!newPost ){
      throw new HttpException('Not Uploaded', 402);
    }
    return newPost;
  }

  async findAllPosts() {
    return  this.postModel.find();
  }

  async likeDislikePost(userId:string, postId:string) {

    const modPost = await this.postModel.findOne({_id:postId});
    if (!modPost.likes.includes(userId)) {
      await modPost.updateOne({ $push: { likes:userId } });
    } else {
      await modPost.updateOne({ $pull: { likes: userId } });
    }
  }


  async addComments(postId:string, newComment: any) {

    const modPost = await this.postModel.findOne({_id:postId});

     return await modPost.updateOne({ $push: { comments: newComment } });
    
  }


  async deletePost(postId:string, userId:string) {

    const modPost = await this.postModel.findOne({_id:postId});
    if (modPost.userId === userId) {
      await modPost.deleteOne();
    } else {
      throw new HttpException('You cannot Delete this post', HttpStatus.BAD_REQUEST);
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
