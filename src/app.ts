import express from "express";
import { authRouter } from "./http/routes/auth.routes";
import { userRouter } from "./http/routes/user.routes";

export const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
