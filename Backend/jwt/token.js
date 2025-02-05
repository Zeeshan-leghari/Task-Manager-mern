import jwt from "jsonwebtoken";
import User from "../Model/user.model.js";

export const generateTokenAndSaveInCookie =async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
