import ChatHistoryModel from "../model/chatHistoryModel.mjs"

const chatHistoryController = {

  getAllChat : async (request, response) => {
    try{
      const result = await ChatHistoryModel.find({})
      if(result){
        response.status(200).send(result)
      }else{
        response.status(400).send({message: "failed to get all chats"})
      }
    }catch(error){
      console.log(error)
      response.status(400).send({message: error.message})
    }
  },

  addChat : async (request, response) => {
    try{
      const newChat = {
        message: request.body.message,
        date: request.body.date,
        time: request.body.time,
        sender: request.body.sender
      };

      const result = await ChatHistoryModel.create(newChat)

      if (result){
        response.status(201).send({message: "chat successfully added to the database"})
      }else{
        response.status(400).send({message: "failed"})
      }
    }catch(error){
      response.status(400).send({message: error.message})
    }
  }
}


export default chatHistoryController