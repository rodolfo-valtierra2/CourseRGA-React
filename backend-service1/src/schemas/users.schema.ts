import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { Exclude } from "class-transformer";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Exclude()
  _id: Types.ObjectId;

  id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Exclude()
  @Prop()
  refreshToken: string;
  @Exclude()
  @Prop()
  refreshTokenExpiration: Date;

  constructor(partial: Partial<User>) {
    if(partial._id){
      partial.id = partial._id.toString();
      Object.assign(this, partial);
    }
  }

}

export const UserSchema = SchemaFactory.createForClass(User);
