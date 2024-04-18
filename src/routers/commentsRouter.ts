// routers/commentsRouter.ts
import {Router} from "express";
import commentsController from "../controllers/commentsControllers.js";
import {checkRoles} from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/comments",
  checkRoles(["USER", "ADMIN"]),
  commentsController.createComment
);

router.get(
  "/comments/:movie_Id",
  checkRoles(["USER", "ADMIN"]),
  commentsController.getCommentByMovieId
);

router.get(
  "/comments",
  checkRoles(["USER", "ADMIN"]),
  commentsController.getAllComments
);

export default router;
