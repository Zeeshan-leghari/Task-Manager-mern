
import express from "express";
import { login, signIn,logout } from "../controller/user.controller.js";

const route = express.Router();


route.post("/register", signIn)
route.post("/login", login)
route.get("/logout", logout)



export default route;