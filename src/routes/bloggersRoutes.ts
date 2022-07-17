import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { bloggers_db } from "../common_db";
import { blogger_validation_middleware } from "../middle-ware/error-handler-middleware";
import { bloggerNameValidation, bloggerUrlValidation } from "../utiles/bloggersErrorHandler";
// import {
//   checkDublicationErrorMessage,
//   errorHandler,
// } from "../utiles/errorHandler";

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
  if (!foundBlogger) {
    res.status(404).send("Not Found");
    return;
  }
  res.send(foundBlogger);
});

bloggersRouter.post(
  "/",
  bloggerNameValidation,
  bloggerUrlValidation,
  blogger_validation_middleware,
  (req: Request, res: Response) => {
    const { name, youtubeUrl } = req.body;

    const newId = Number(new Date());

    const newBlogger = {
      id: newId,
      name,
      youtubeUrl,
    };

    bloggers.push(newBlogger);
    res.status(201).send(newBlogger);
  }
);

bloggersRouter.put("/:id", 
bloggerNameValidation,
bloggerUrlValidation,
blogger_validation_middleware,
(req: Request, res: Response) => {
  const { name, youtubeUrl } = req.body;
  const { id } = req.params;

  const foundBlogger = bloggers.find((item) => item.id === Number(id));
  if (!foundBlogger) {
    res.status(404).send("Not Found");
    return;
  }

  if (foundBlogger) {
    foundBlogger.name = name;
    foundBlogger.youtubeUrl = youtubeUrl;
  }

  res.status(204).send(foundBlogger);
});

bloggersRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundItem = bloggers.find((item) => +id === item.id);

  if (!foundItem) {
    res.status(404).send();
    return;
  }

  if (foundItem) {
    const currentIndex = bloggers.indexOf(foundItem);
    bloggers.splice(currentIndex, currentIndex + 1);
    res.status(204).send(bloggers);
  }
});

export default bloggersRouter;
