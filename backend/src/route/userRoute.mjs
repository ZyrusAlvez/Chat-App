import userController from "../controller/userController.mjs";
import express from "express";

const userRouter = express.Router()

userRouter.get("/", userController.getAllUser)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/sign", userController.sign)
userRouter.post("/log", userController.log)

export default userRouter