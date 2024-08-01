import UserModel from "../model/userModel.mjs"
import express from "express"

const userRouter = express.Router()

userRouter.get("/", async (request, response) => {
  try{
    const result = await UserModel.find({})
    response.status(200).json(result)
  }catch(error){
    response.status(400).send({message: error.message})
  }
})

userRouter.get("/:id", async (request, response) => {
  try {
    const result = UserModel.findById(request.params.id)
    if(result){
      response.status(200).json(result)
    }else{
      response.status(404).send({message: "invalid id"})
    }
  }catch(error){
    response.status(400).send({message: error.message})
  }
})

userRouter.post("/post", async (request, response) => {
  try{
    const newUser = {
      username: request.body.username,
      password: request.body.password
    }
    console.log(newUser)
    const user = await UserModel.create(newUser)
    console.log(user)

    const result = await UserModel.findByIdAndUpdate(user._id, {
      username: request.body.username + user._id,
      password: request.body.password + user._id
    }, {new: true})

    if (!result){
      response.status(400).send("update error")
    }
    response.status(201).send(result)
  }catch(error){
    console.log(`post error: ${error}`);
    response.status(400).send({message: error.message})
  }
})

userRouter.put("/put/:id", async (request, response) => {
  try{
    const result = await UserModel.findByIdAndUpdate(request.params.id, request.body, {new: true})
                                                     // id              new data       returns the new data (default is to return the old)       
    if(!result){
      response.status(404).send({message: "username not found"})
    }
    response.status(200).send({message: "successfully updated"})
  }catch(error){
    console.log(`put error ${error}`)
    response.status(400).send({message: error.message})
  }
})


export default userRouter