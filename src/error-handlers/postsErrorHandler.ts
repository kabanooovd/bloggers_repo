import { body } from "express-validator";
import { bloggers_db } from "../common_db";

const bloggers = bloggers_db;

export const postsContentValidation = body("content")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Content is incorrect");

export const postsShortDescriptionValidation = body("shortDescription")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("ShortDescription is incorrect");

export const postsTitleValidation = body("title")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Title is incorrect");

export const postsBloggerIdValidation = body("bloggerId")
  .isInt()
  .custom((value) => typeof value === "number") // If income val is Number
  .custom((value) => bloggers.map((b) => b.id).includes(value)) // If income val is exist in bloggers lest
  .withMessage("Some poblem with current user...");
