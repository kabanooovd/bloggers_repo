import { body } from "express-validator";
import { bloggers_db } from "../common_db";
import { blogger_validation_middleware } from "../middle-ware/error-handler-middleware";

const bloggers = bloggers_db;

const postsContentValidation = body("content")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Content is incorrect");

const postsShortDescriptionValidation = body("shortDescription")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("ShortDescription is incorrect");

const postsTitleValidation = body("title")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Title is incorrect");

const postsBloggerIdValidation = body("bloggerId")
  .isInt()
  .custom((value) => typeof value === "number") // If income val is Number
  .custom((value) => bloggers.map((b) => b.id).includes(value)) // If income val is exist in bloggers lest
  .withMessage("Some poblem with current user...");

export default [
  postsContentValidation,
  postsShortDescriptionValidation,
  postsTitleValidation,
  postsBloggerIdValidation,
  blogger_validation_middleware,
];
