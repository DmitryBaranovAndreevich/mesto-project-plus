import { IUser } from "../interface/user";
import {Schema, model} from "mongoose";
import validator from "validator";

const userShema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    validate: {
      validator:(v: string) => validator.isURL(v),
      message: "Некорректный URL"
    }
  }
})

export default model<IUser>("user", userShema);