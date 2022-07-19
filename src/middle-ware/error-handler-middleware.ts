import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const blogger_validation_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    },
  });

  const outletErrors: any = [];

  const errors = myValidationResult(req);

  errors.array().forEach((element) => {
    const foundItem = outletErrors.find(
      (item: any) => item.field === element.field
    );
    if (!foundItem) {
      outletErrors.push(element);
    }
  });

  if (!errors.isEmpty()) {
    return res.status(400).json({ errorsMessages: outletErrors });
  } else {
    next();
  }
};
