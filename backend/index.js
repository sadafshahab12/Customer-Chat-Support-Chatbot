import express from "express";
import cors from "cors";
import { chatRouter } from "./routes/ChatRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", chatRouter);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
