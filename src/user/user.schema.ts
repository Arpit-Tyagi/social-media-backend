import mongoose from 'mongoose';
const { Schema } = mongoose;

export const UserSchema = new Schema({
  name:  {type:String, required:true}, // String is shorthand for {type: String}
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true}
});


