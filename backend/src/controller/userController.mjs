import UserModel from "../model/userModel.mjs";

const userController = {
  getAllUser: async (request, response) => {
    try {
      const result = await UserModel.find({});
      
      if (result) {
        response.status(200).send(result);
      } else {
        response.status(404).send({ message: "failed to fetch all user" });
      }
    } catch (error) {
      console.log(error)
      response.status(404).send({ message: error.message });
    }
  },

  getUserById: async (request, response) => {
    try {
      const result = await UserModel.findById(request.params.id);
      if (result) {
        response.status(200).json(result);
      } else {
        response.status(404).send({ message: "user id not found" });
      }
    } catch (error) {
      response.status(404).send({ message: error.message });
    }
  },

  sign: async (request, response) => {
    try {
      const newUser = {
        username: request.body.username,
        password: request.body.password,
      };

      const result = await UserModel.create(newUser);
      if (result) {
        response.status(201).json(newUser);
      } else {
        response.status(400).send({ message: "account not created" });
      }
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  },

  log: async (request, response) => {
    try {
      const result = await UserModel.findOne({
        username: request.body.username,
        password: request.body.password,
      });

      if (result){
        response.status(200).json(result)
      }else{
        response.status(400).send({message: "account not found"})
      }
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  },
};

export default userController