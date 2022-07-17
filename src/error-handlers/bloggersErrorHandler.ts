import { body } from "express-validator";

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
]