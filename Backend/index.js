import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import route from "./Routes/routes.js";
import userRoute from "./Routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

const PORT = process.env.PORT || 4001;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
 
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
app.use(express.json());
app.use("/", userRoute);
app.use("/", route);

const server = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
  });
};

server();
