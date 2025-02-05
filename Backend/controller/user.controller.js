import bcrypt from "bcryptjs";
import User from "../Model/user.model.js";
import { z } from "zod";
import { generateTokenAndSaveInCookie } from "../jwt/token.js";

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const signIn = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validation = userSchema.safeParse({ username, email, password });
  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.format(),
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      const token = await generateTokenAndSaveInCookie(savedUser._id, res);
      res
        .status(201)
        .json({ message: "User created successfully", user: savedUser, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password or Email" });
    }
    const token = await generateTokenAndSaveInCookie(user._id, res);

    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
