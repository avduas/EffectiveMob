import { Router } from "express";
import { getUserById, listUsers, blockUser } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.use(authenticate); 
userRouter.get("/:id", getUserById);
userRouter.get("/", listUsers); 
userRouter.patch("/:id/block", blockUser);
