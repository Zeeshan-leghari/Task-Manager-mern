import jwt from "jsonwebtoken";
import User from "../Model/user.model.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user= await User.findById(decode.userId);
  next()
};
