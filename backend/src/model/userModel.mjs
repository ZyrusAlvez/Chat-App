import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username : {
      type: String,
      required: true
    },
    password : {
      type: String,
      required: true
    },
    online : {
      type: Boolean,
      required: false
    }
  }
)

const UserModel = mongoose.model("user", userSchema)

export default UserModel

