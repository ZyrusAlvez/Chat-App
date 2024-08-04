import chatHistoryController from "../controller/chatHistoryController.mjs";
import express from "express"

const chatHistoryRouter = express.Router()

chatHistoryRouter.get("/", chatHistoryController.getAllChat)
chatHistoryRouter.post("/add", chatHistoryController.addChat);

export default chatHistoryRouter