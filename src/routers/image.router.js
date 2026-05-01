import express from "express";
import { imageController } from "../controllers/image.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const imageRouter = express.Router();

imageRouter.get("/", imageController.getAllImages);
imageRouter.get("/search", imageController.searchImagesByName);
imageRouter.get("/:id", imageController.getImageDetail);

imageRouter.post("/", protect, imageController.addImage);
imageRouter.delete("/:id", protect, imageController.deleteImage);

export default imageRouter;
