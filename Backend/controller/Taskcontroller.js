import Task from "../model/Taskmodel.js";

// Create Task
export const taskcreate = async (req, res) => {
  const { taskname, description, taskstatus } = req.body;

  if (!taskname || !description || !taskstatus) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const tasks = new Task({
      taskname,
      description,
      taskstatus,
      user : req.user._id
    });

    const savetask = await tasks.save();
    res.status(200).json({ message: "Task created successfully", tasks: savetask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read All Tasks
export const taskread = async (req, res) => {
  try {
    const readtask = await Task.find({ user : req.user._id});

  

    res.status(200).json({ message: "Tasks retrieved successfully", tasks: readtask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const readtaskone = async (req, res) => {
  const { id } = req.params;

  try {
    const readone = await Task.findOne({ _id: id });

    if (!readone) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task retrieved successfully", task: readone });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Task
export const update = async (req, res) => {
  const { id } = req.params;
  const updatebody = req.body;

  try {
    const updatetask = await Task.findByIdAndUpdate(id, updatebody, {
      new: true,
    });

    if (!updatetask) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", tasks: updatetask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Task
export const deletetask = async (req, res) => {
  const { id } = req.params;

  try {
    const taskdelete = await Task.findByIdAndDelete(id);

    if (!taskdelete) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", tasks: taskdelete });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
