import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique:true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({default: ""})
  profilePicture: string;

  @Prop({default: ""})
  coverPicture: string;

  @Prop()
  friendlist: [];

  @Prop()
  requestList: [];

  @Prop({ required: true ,  type: "date" })
  dob: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
