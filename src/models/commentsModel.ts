import mongoose, {Schema} from "mongoose";

export interface IComment extends mongoose.Document {
  movie_Id: string;
  text: string;
  user: string;
}

const CommentSchema = new Schema({
  movie_Id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {type: Date, default: Date.now()},
});

export default mongoose.model<IComment>("Comment", CommentSchema);
