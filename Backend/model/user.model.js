import mongoose from "mongoose";

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
 
});

const User = mongoose.model("user", user);

export default User;
