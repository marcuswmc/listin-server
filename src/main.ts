import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import listRoutes from "./routes/lists";
import itemRoutes from "./routes/items";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api", listRoutes);
app.use("/api", itemRoutes);

// Conectar ao MongoDB
const startApp = async () => {
  try {
      mongoose.set("strictQuery", true)
      await mongoose.connect(process.env.MONGO_URI || " ")
      console.log("Connected to DB")

      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
  }catch(error) {
      console.log("Error")
  }
}

startApp();
