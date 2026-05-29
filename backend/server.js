import express from "express";
import envs from "./config/vars.js";
import todosRoutes from "./routes/todo.routes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/todos", todosRoutes);
app.get("{0,}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = envs.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port: ", PORT);
  connectDB();
});