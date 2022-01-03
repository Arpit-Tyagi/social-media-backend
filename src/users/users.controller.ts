import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors, UploadedFile, Res, Put } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import path, { join } from 'path';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Posts } from './schema/post.schema';





export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  })

}




@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  create(@Body() createUserDto: User) {
      return  this.usersService.create(createUserDto); 
  }

  @Post('/userLogin')
  loginUser(@Body() createUserDto:any) {
    return this.usersService.userLogin(createUserDto);
  }

  @Get('/userById/:userId')
  getUserById( @Param("userId") userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Post('/uploadPost')
  uploadPost(@Body() createUserDto: Posts) {
      return  this.usersService.uploadPost(createUserDto); 
  }
  @Delete('/deletePost/:userId/:postId')
  deletePost(@Param("userId") userId: string , @Param("postId") postId: string) {
      return  this.usersService.deletePost(postId, userId);
  }

  @Get('/allPosts')
  findAllPosts() {
    return this.usersService.findAllPosts();
  }

  @Put('/likedislikePost/:postId/:userId')
  LikePost(@Param("userId") userId: string , @Param("postId") postId: string) {
    return this.usersService.likeDislikePost(userId,postId);
  }

  @Put('/addComment/:postId')
  addComment(@Param('postId') postId: string, @Body() newComment: any) {
    return this.usersService.addComments(postId, newComment);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile( @UploadedFile() file ): Observable<Object> {
    console.log(file);
      return of({imagePath: file.path})
  }

  @Get('/images/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)));
    }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
