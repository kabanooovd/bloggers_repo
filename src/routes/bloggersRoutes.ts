import { Request, Response, Router } from "express";
import bloggersRepo from "../repositories/bloggers-repo";
import bloggersErrorHandler from "../error-handlers/bloggersErrorHandler";
import { authMiddleware } from "../middle-ware/auth-middleware";

const bloggersRouter = Router({});

bloggersRouter.get("/", (req: Request, res: Response) => {
  const bloggersList = bloggersRepo.getBloggersList();
  res.send(bloggersList);
});

bloggersRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const foundBlogger = bloggersRepo.findBlogger(+id);
  if (!foundBlogger) {
    res.status(404).send("Not Found");
    return;
  }
  res.send(foundBlogger);
});

bloggersRouter.post(
  "/",
  authMiddleware,
  [...bloggersErrorHandler],
  (req: Request, res: Response) => {
    const { name, youtubeUrl } = req.body;
    const newBlogger = bloggersRepo.createBlogger(name, youtubeUrl);
    res.status(201).send(newBlogger);
  }
);

bloggersRouter.put(
  "/:id",
  authMiddleware,
  [...bloggersErrorHandler],
  (req: Request, res: Response) => {
    const { name, youtubeUrl } = req.body;
    const { id } = req.params;

    const foundBlogger = bloggersRepo.updateBlogger(+id, name, youtubeUrl);
    if (!foundBlogger) {
      res.status(404).send("Not Found");
      return;
    }
    res.status(204).send(foundBlogger);
  }
);

bloggersRouter.delete("/:id", authMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const foundItem = bloggersRepo.removeBlogger(+id);

  if (!foundItem) {
    res.status(404).send();
    return;
  }

  res.status(204).send(foundItem);
});

export default bloggersRouter;
