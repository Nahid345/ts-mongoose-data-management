import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./modules/users/user.route";
const app: Application = express();
const port = 3000;

//parser

app.use(express.json());
app.use(cors());

//application routes

app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

console.log(process.cwd());

export default app;