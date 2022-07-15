import { Request, Response, Router } from "express";
import { bloggers_db } from "../common_db";
import { errorHandler } from "../utiles/errorHandler";

const bloggersRouter = Router({});

const bloggers = bloggers_db;

const pattern = new RegExp(
  /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
);

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

  let errors = [];

  if (!name.replace(/^\s+|\s+$|\s+(?=\s)/g, "") || name.length > 15) {
    errors.push({ message: "111", field: "name" });
    //errorHandler(res, 400, "some message...", "name");
  }

  if (!youtubeUrl || youtubeUrl.length > 100) {
    // errorHandler(res, 400, "some message...", "youtubeUrl");
    errors.push({ message: "222", field: "youtubeUrl" });
  }

  if (!pattern.test(youtubeUrl)) {
    // errorHandler(res, 400, "some message...", "youtubeUrl");
    errors.push({ message: "333", field: "youtubeUrl" });
  }

  if (errors.length) {
    errorHandler(res, 400, "some message...", "youtubeUrl", errors);
    return
  }

  const newBlogger = {
    id: newId,
    name,
    youtubeUrl,
  };

  bloggers.push(newBlogger);
  res.status(201).send(newBlogger);
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
