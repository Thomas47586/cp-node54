import express from "express";
import { userController } from "../controllers/user.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const userRouter = express.Router();

// Tất cả route trong User Router đều yêu cầu đăng nhập
userRouter.use(protect);

userRouter.get("/profile", userController.getProfile);
userRouter.put("/profile", userController.updateProfile);

userRouter.get("/saved-images", userController.getSavedImages);
userRouter.get("/created-images", userController.getCreatedImages);

userRouter.get("/check-save/:imageId", userController.checkSavedImage);
userRouter.post("/save-image/:imageId", userController.saveImage);

export default userRouter;
