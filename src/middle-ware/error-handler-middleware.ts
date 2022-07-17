import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const blogger_validation_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            field: error.param
        }
    }
  })

  const errors = myValidationResult(req);


  if (!errors.isEmpty()) {
    return res.status(400).json({ errorsMessages: errors.array() });
  } else {
    next();
  }
};
