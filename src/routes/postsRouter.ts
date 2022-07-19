import { Request, Response, Router } from "express";
import postsRepo from "../repositories/posts-repo";
import postsErrorHandler from "../error-handlers/postsErrorHandler";
import { authMiddleware } from "../middle-ware/auth-middleware";
import bloggersRepo from "../repositories/bloggers-repo";

const postsRouter = Router({});

postsRouter.get("/", (req: Request, res: Response) => {
  const currentPostsList = postsRepo.getPostsList();
  res.send(currentPostsList);
});

postsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundPost = postsRepo.findPost(+id);
  if (!foundPost) {
    res.status(404).send("Not Found");
    return;
  }
  res.send(foundPost);
});

postsRouter.post(
  "/",
  authMiddleware,
  [...postsErrorHandler],
  (req: Request, res: Response) => {
    const { title, shortDescription, content, bloggerId } = req.body;

    const createdPost = postsRepo.createPost(
      bloggerId,
      title,
      shortDescription,
      content
    );

    res.status(201).send(createdPost);
  }
);

postsRouter.put(
  "/:id",
  authMiddleware,
  [...postsErrorHandler],
  (req: Request, res: Response) => {
    const { title, shortDescription, content, bloggerId } = req.body;
    const { id } = req.params;

    const foumdBlogger = bloggersRepo.findBlogger(+bloggerId);

    if (!foumdBlogger) {
      res.status(404).send("Blogger not found");
      return;
    }

    const foundPost = postsRepo.updatePost(
      bloggerId,
      title,
      shortDescription,
      content,
      +id
    );

    if (!foundPost) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(204).send(foundPost);
  }
);

postsRouter.delete("/:id", authMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const foundPost = postsRepo.removePost(+id);
  if (!foundPost) {
    res.status(404).send("Not Found");
    return;
  }
  res.status(204).send(foundPost);
});

export default postsRouter;
