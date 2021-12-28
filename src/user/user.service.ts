import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {UserSchema} from './user.schema';


@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<any> ) {}

    
        



}
