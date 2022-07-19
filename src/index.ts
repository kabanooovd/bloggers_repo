import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bloggersRouter from "./routes/bloggersRoutes";
import postsRouter from "./routes/postsRouter";
import { checkIpMiddleware } from "./middle-ware/check-ip-middleware";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/bloggers", checkIpMiddleware, bloggersRouter);
app.use("/posts", checkIpMiddleware, postsRouter);

app.set('trust proxy', true)

app.get("/", checkIpMiddleware, (req: Request, res: Response) => {
  res.send("dimas test new");
});

app.listen(port, () => {
  console.log(`app has startd on ${port} port`);
});
