import { ICard } from "../interface/card";
import {Schema, model} from "mongoose";
import validator from "validator";

const cardShema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
     validate: {
      validator:(v: string) => validator.isURL(v),
      message: "Некорректный URL"
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model<ICard>("card", cardShema);