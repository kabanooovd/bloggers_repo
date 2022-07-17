import { Request, Response, Router } from "express";
import { bloggers_db, posts_db } from "../common_db";
import { blogger_validation_middleware } from "../middle-ware/error-handler-middleware";
import { IPosts } from "../types";
import {
  postsBloggerIdValidation,
  postsContentValidation,
  postsShortDescriptionValidation,
  postsTitleValidation,
} from "../utiles/postsErrorHandler";
// import {
//   checkDublicationErrorMessage,
//   errorHandler,
// } from "../utiles/errorHandler";

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

postsRouter.post(
  "/",
  postsContentValidation,
  postsShortDescriptionValidation,
  postsTitleValidation,
  postsBloggerIdValidation,
  blogger_validation_middleware,
  (req: Request, res: Response) => {
    const { title, shortDescription, content, bloggerId } = req.body;

    const foundBlogger = bloggers.find((item) => item.id === bloggerId);

    // if (!foundBlogger) {
    //   res.status(404).send("Not Found");
    // }

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
  }
);

postsRouter.put(
  "/:id",
  postsContentValidation,
  postsShortDescriptionValidation,
  postsTitleValidation,
  postsBloggerIdValidation,
  blogger_validation_middleware,
  (req: Request, res: Response) => {
    const { title, shortDescription, content, bloggerId } = req.body;
    const { id } = req.params;

    const foundPost = posts.find((item) => item.id === Number(id));

    const foundBlogger = bloggers.find((item) => item.id === bloggerId);

    if (foundPost) {
      foundPost.title = title;
      foundPost.shortDescription = shortDescription;
      foundPost.content = content;
      foundPost.bloggerId = bloggerId;
      res.status(204).send(foundPost);
    }
  }
);

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
