import { Request, Response, Router } from "express";
import { bloggers_db } from "../bloggers_db";
import { errorHandler } from "../utiles/errorHandler";

const bloggersRouter = Router({});

const bloggers = bloggers_db;

bloggersRouter.get("/", (req: Request, res: Response) => {
  res.send(bloggers);
});

bloggersRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundBlogger = bloggers.find((item) => item.id === Number(id));
  if (!foundBlogger) res.status(404).send("Not Found");
  res.send(foundBlogger);
});

bloggersRouter.post("/", (req: Request, res: Response) => {
  const { name, youtubeUrl } = req.body;

  const newId = Number(new Date());

  if (!name || name.length > 15)
    errorHandler(res, 400, "some message...", "name");
  if (!youtubeUrl || youtubeUrl.length > 100)
    errorHandler(res, 400, "some message...", "youtubeUrl");

  const pattern = new RegExp(
    /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?v\=\w+$/
  );

  if (!pattern.test(youtubeUrl))
    errorHandler(res, 400, "some message...", "youtubeUrl");

  res.status(201).send({
    id: newId,
    name,
    youtubeUrl,
  });
});

bloggersRouter.put("/:id", (req: Request, res: Response) => {
  const { name, youtubeUrl } = req.body;
  const { id } = req.params;

  const foundBlogger = bloggers.find((item) => item.id === Number(id));
  if (!foundBlogger) res.status(404).send("Not Found");
  if (!name || name.length > 15)
    errorHandler(res, 400, "some message...", "name");
  if (!youtubeUrl || youtubeUrl.length > 100)
    errorHandler(res, 400, "some message...", "youtubeUrl");

  const pattern = new RegExp(
    /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/watch\?v\=\w+$/
  );

  if (!pattern.test(youtubeUrl))
    errorHandler(res, 400, "some message...", "youtubeUrl");

  if (foundBlogger) {
    foundBlogger.name = name;
    foundBlogger.youtubeUrl = youtubeUrl;
  }

  res.status(204).send(foundBlogger);
});

bloggersRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundItem = bloggers.find((item) => +id === item.id);

  if (!foundItem) res.status(404).send();

  if (foundItem) {
    const currentIndex = bloggers.indexOf(foundItem);
    bloggers.splice(currentIndex, currentIndex + 1);
    res.status(204).send(bloggers);
  }
});

export default bloggersRouter;
