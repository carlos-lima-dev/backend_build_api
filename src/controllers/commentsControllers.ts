// controllers/commentsController.ts
import {Request, Response} from "express";
import {IComment} from "../interfaces/interfaces.js";
import commentsService from "../services/commentsService.js";

class CommentsController {
  async getAllComments(req: Request, res: Response) {
    const comments = await commentsService.getAll();
    return res.json(comments);
  }
  async createComment(req: Request, res: Response): Promise<Response> {
    try {
      const newComment: IComment = await commentsService.create(req.body);

      return res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      return res.status(500).json({error: "Internal Server Error"});
    }
  }

  async getCommentByMovieId(req: Request, res: Response) {
    try {
      const {movie_Id} = req.params;
      const comments: IComment[] = await commentsService.getByMovieId(movie_Id);

      if (!comments || comments.length === 0) {
        return res.status(404).json({error: "Comments not found"});
      }

      return res.json(comments);
    } catch (error) {
      console.error("Error getting comments:", error);
      return res.status(500).json({error: "Internal Server Error"});
    }
  }
}

export default new CommentsController();
