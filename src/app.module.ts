import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import {MongooseModule} from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';

@Module({
   imports: [MongooseModule.forRoot('mongodb+srv://arpittyagi:arpit@cluster0.ujaao.mongodb.net/nest-js?retryWrites=true&w=majority'),
   UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
