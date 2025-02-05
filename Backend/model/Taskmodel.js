import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskname: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  taskstatus: {
    type: Boolean,
    required: true,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  }
});

const Task = mongoose.model("task", taskSchema);

export default Task;
