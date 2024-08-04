import UserModel from "../model/userModel.mjs";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", async (request, response) => {
  try {
    const result = await UserModel.find({});
    response.status(200).json(result);
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

userRouter.get("/:id", async (request, response) => {
  try {
    const result = UserModel.findById(request.params.id);
    if (result) {
      response.status(200).json(result);
    } else {
      response.status(404).send({ message: "invalid id" });
    }
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

// route for signing in
userRouter.post("/sign", async (request, response) => {
  try {
    const newUser = {
      username: request.body.username,
      password: request.body.password,
    };
    const result = await UserModel.create(newUser);

    if (!result) {
      response.status(400).send("did not saved");
    }
    response.status(201).send(result);
  } catch (error) {
    console.log(`post error: ${error}`);
    response.status(400).send({ message: error.message });
  }
});

// route for logging in
userRouter.post("/log", async (request, response) => {
  try {
    const { username, password } = request.body;
    const result = await UserModel.findOne({ username, password });
    console.log(result);
    if (result) {
      response.status(200).json({ message: "login successfully", result });
    } else {
      response.status(404).send({ message: "Incorrect password" });
    }
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

export default userRouter;
