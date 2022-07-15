import { Request, Response, Router } from "express";
import { bloggers_db, posts_db } from "../common_db";
import { IPosts } from "../types";
import { errorHandler } from "../utiles/errorHandler";

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

postsRouter.post("/", (req: Request, res: Response) => {
  const { title, shortDescription, content, bloggerId } = req.body;

  if (!title || title.length > 30)
    errorHandler(res, 400, "some message...", "title");

  if (!shortDescription || shortDescription.length > 100)
    errorHandler(res, 400, "some message...", "shortDescription");

  if (!content || content.length > 1000)
    errorHandler(res, 400, "some message...", "content");

  if (!bloggerId || typeof bloggerId !== "number")
    errorHandler(res, 400, "some message...", "bloggerId");

  const foundBlogger = bloggers.find((item) => item.id === bloggerId);
  if (!foundBlogger) res.status(404).send("Not Found");

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
  if (!foundPost) res.status(404).send("Not Found");

  if (!title || title.length > 30)
    errorHandler(res, 400, "some message...", "title");

  if (!shortDescription || shortDescription.length > 100)
    errorHandler(res, 400, "some message...", "shortDescription");

  if (!content || content.length > 1000)
    errorHandler(res, 400, "some message...", "content");

  if (!bloggerId || typeof bloggerId !== "number")
    errorHandler(res, 400, "some message...", "bloggerId");

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
})

export default postsRouter;
