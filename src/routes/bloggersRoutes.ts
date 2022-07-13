import { Request, Response, Router } from "express";
import { bloggers_db } from "../bloggers_db";

const bloggersRouter = Router({});

const bloggers = bloggers_db;

bloggersRouter.get("/", (req: Request, res: Response) => {
  res.send(bloggers);
});

export default bloggersRouter;
