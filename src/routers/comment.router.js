import express from "express";
import { commentController } from "../controllers/comment.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const commentRouter = express.Router();

commentRouter.get("/:imageId", commentController.getCommentsByImage);
commentRouter.post("/", protect, commentController.addComment);

export default commentRouter;
