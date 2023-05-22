import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { Posts, PostSchema } from './schema/post.schema';

@Module({
  imports :[ 
    MongooseModule.forFeature([{name: User.name , schema: UserSchema}, {name: Posts.name , schema: PostSchema}])
   ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
