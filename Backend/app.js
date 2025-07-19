import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import router from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js"
import todoRoutes from "./routes/todo.routes.js"

dotenv.config()

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", router);
app.use("/api/v1/project", projectRoutes)
app.use("/api/v1/todo", todoRoutes)

export default app;