import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {

  @Prop({ required: true })
  userId: string;

  @Prop()
  desc: string;

  @Prop()
  img: string;

  @Prop({type: Array })
  likes: string [];
 
  @Prop({type: Array })
  comments:  [];

  @Prop({ timestamps: true,  default: Date.now })
  date:Date;

}

export const PostSchema = SchemaFactory.createForClass(Posts);

