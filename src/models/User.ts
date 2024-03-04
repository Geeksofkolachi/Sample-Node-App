import { model, Schema, Document } from "mongoose";

export interface IUser {
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface UserDoc extends IUser, Document {}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  picture: { type: String },
});

export const User = model<UserDoc>("User", userSchema);
