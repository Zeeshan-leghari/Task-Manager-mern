import express from "express";
import {
  deletetask,
  readtaskone,
  taskcreate,
  taskread,
  update,
} from "../controller/Taskcontroller.js";
import { authenticate } from "../middleware/authenticate.js";

const route = express.Router();

route.post("/taskcreate", authenticate, taskcreate);

route.get("/readtask", authenticate, taskread);

route.get("/readone/:id", authenticate, readtaskone);

route.put("/update/:id", authenticate, update);

route.delete("/delete/:id", authenticate, deletetask);

export default route;
