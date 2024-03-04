import express from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);

export { indexRouter };
