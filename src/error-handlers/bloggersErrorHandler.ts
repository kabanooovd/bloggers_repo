import { body } from "express-validator";
import { blogger_validation_middleware } from "../middle-ware/error-handler-middleware";

const bloggerNameValidation = body("name")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Name is incorrect");

const bloggerUrlValidation = body("youtubeUrl")
  .isURL()
  .isLength({ max: 100 });

export default [
  bloggerNameValidation,
  bloggerUrlValidation,
  blogger_validation_middleware,
]