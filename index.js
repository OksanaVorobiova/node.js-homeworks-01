require = require("esm")(module);
import dotenv from "dotenv";
dotenv.config();
import contactsRouter from "./routers/contactsRouter";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const PORT = process.env.PORT || 3000;

const runServer = async () => {
  const app = express();
  try {
    await mongoose.connect(
      process.env.DB_URI,
      { useUnifiedTopology: true, useFindAndModify: false },
      (error) => {
        if (error) {
          console.log(error);
          process.exit(1);
        }
      }
    );
    console.log("Database connection successful");
    app.use(express.json());
    app.use(cors());
    app.use("/api/contacts", contactsRouter);
    app.get("/", (req, res) => res.send("Hello from API"));
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

runServer();
