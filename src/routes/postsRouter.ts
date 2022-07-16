import { NextFunction, Request, Response, Router } from "express";
import { bloggers_db, posts_db } from "../common_db";
import { IPosts } from "../types";
import {
  checkDublicationErrorMessage,
  errorHandler,
} from "../utiles/errorHandler";

const postsRouter = Router({});

const posts = posts_db;
const bloggers = bloggers_db;

postsRouter.get("/", (req: Request, res: Response) => {
  res.send(posts);
});

postsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundPost = posts.find((item) => item.id === Number(id));
  if (!foundPost) res.status(404).send("Not Found");
  res.send(foundPost);
});

postsRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  const { title, shortDescription, content, bloggerId } = req.body;

  const foundBlogger = bloggers.find((item) => item.id === bloggerId);

  if (!foundBlogger) {
    res.status(404).send("Not Found");
    return;
  }

  let errors: any[] = [];

  if (
    !Object.keys(req.body).includes("title") ||
    !title.trim() ||
    title.length > 30
  ) {
    checkDublicationErrorMessage(errors, "title", "111");
  }

  if (
    !Object.keys(req.body).includes("shortDescription") ||
    !shortDescription.trim() ||
    shortDescription.length > 100
  ) {
    checkDublicationErrorMessage(errors, "shortDescription", "222");
  }

  if (
    !Object.keys(req.body).includes("content") ||
    !content.trim() ||
    content.length > 1000
  ) {
    checkDublicationErrorMessage(errors, "content", "333");
  }

  if (
    !Object.keys(req.body).includes("bloggerId") ||
    !foundBlogger ||
    !bloggerId ||
    typeof bloggerId !== "number"
  ) {
    checkDublicationErrorMessage(errors, "bloggerId", "444");
  }

  if (errors.length) {
    errorHandler(res, 400, "some message...", "youtubeUrl", errors);
    return;
  }

  if (foundBlogger) {
    const newId = Number(new Date());

    const newPost: IPosts = {
      id: newId,
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: foundBlogger.name,
    };

    posts.push(newPost);
    res.status(201).send(newPost);
  }
});

postsRouter.put("/:id", (req: Request, res: Response) => {
  const { title, shortDescription, content, bloggerId } = req.body;
  const { id } = req.params;

  const foundPost = posts.find((item) => item.id === Number(id));

  const foundBlogger = bloggers.find((item) => item.id === bloggerId);

  const errors: any[] = [];

  if (!foundPost) {
    res.status(404).send("Not Found");
    return;
  }

  if (
    !Object.keys(req.body).includes("title") ||
    !title.trim() ||
    title.length > 30
  ) {
    checkDublicationErrorMessage(errors, "title", "111");
  }

  if (
    !Object.keys(req.body).includes("shortDescription") ||
    !shortDescription.trim() ||
    shortDescription.length > 100
  ) {
    checkDublicationErrorMessage(errors, "shortDescription", "222");
  }

  if (
    !Object.keys(req.body).includes("content") ||
    !content.trim() ||
    content.length > 1000
  ) {
    checkDublicationErrorMessage(errors, "content", "333");
  }

  if (!foundBlogger || !bloggerId || typeof bloggerId !== "number") {
    checkDublicationErrorMessage(errors, "bloggerId", "444");
  }

  if (errors.length) {
    errorHandler(res, 400, "some message...", "youtubeUrl", errors);
    return;
  }
  if (foundPost) {
    foundPost.title = title;
    foundPost.shortDescription = shortDescription;
    foundPost.content = content;
    foundPost.bloggerId = bloggerId;
    res.status(204).send(foundPost);
  }
});

postsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundPost = posts.find((item) => item.id === Number(id));
  if (!foundPost) res.status(404).send("Not Found");
  if (foundPost) {
    const currentIndex = posts.indexOf(foundPost);
    posts.splice(currentIndex, currentIndex + 1);
    res.status(204).send(posts);
  }
});

export default postsRouter;
