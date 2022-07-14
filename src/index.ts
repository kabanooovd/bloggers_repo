import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bloggersRouter from "./routes/bloggersRoutes";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/bloggers", bloggersRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("dimas test 11111");
});

app.listen(port, () => {
  console.log(`app has startd on ${port} app`);
});
