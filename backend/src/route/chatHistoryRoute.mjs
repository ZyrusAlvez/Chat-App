import ChatHistory from "../model/chatHistoryModel.mjs";
import express from "express"

const chatHistoryRouter = express.Router()

chatHistoryRouter.get("/", async (request, response) => {
  try {
    const books = await ChatHistory.find({});
    return response.status(200).json(books);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
})

chatHistoryRouter.post("/add", async (request, response) => {
  try {
    const newChat = {
      message: request.body.message,
      date: request.body.date,
      time: request.body.time,
      sender: request.body.sender
    };
    const chat = await ChatHistory.create(newChat);
    return response.status(201).send(chat);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

export default chatHistoryRouter