// services/commentsService.ts
import {IComment} from "../interfaces/interfaces.js";
import commentModel from "../models/commentsModel.js";

class CommentsService {
  async getAll() {
    return await commentModel.find();
  }

  async getByMovieId(movie_Id: string): Promise<IComment[]> {
    try {
      return await commentModel.find({movie_Id});
    } catch (error) {
      throw error;
    }
  }

  async create(commentData: any): Promise<IComment> {
    try {
      const {movie_Id, text, user} = commentData;

      if (!movie_Id || !text || !user) {
        throw new Error("Missing required fields");
      }

      const newCommentData: any = {
        movie_Id,
        text,
        user,
      };

      const newComment = await commentModel.create(newCommentData);

      return newComment.toObject() as IComment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw new Error("Failed to create comment");
    }
  }
}

export default new CommentsService();
