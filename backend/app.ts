import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongodb_uri = process.env.MONGDB_URI || "mongodb://localhost:27017";

// database connection
mongoose
  .connect(mongodb_uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

import { signupRouter } from "./src/Routes/signupRouter";
import { loginRouter } from "./src/Routes/loginRouter";
import { courseRouter } from "./src/Routes/courseRouter";
import { noticeRouter } from "./src/Routes/noticeRouter";
import { authenticate } from "./src/Middlewares/checkLogin";
// routing setup
app.use("/", loginRouter);
app.use("/signup", signupRouter);
app.use("/courses", authenticate, courseRouter);
app.use("/notice", authenticate, noticeRouter);

app.listen(3001, () => {
  console.log(`app listening to port 3001`);
});
