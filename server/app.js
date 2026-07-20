const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const itemRouter = require("./routes/items.router");

const app = express();
dotenv.config({ quiet: true });

app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/marketplace", itemRouter);
app.use("/api/auth", userRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
