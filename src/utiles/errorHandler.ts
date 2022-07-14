import { Response } from "express";

export const errorHandler = (
  response: Response,
  currentStatus: number,
  message: string,
  field: string
) => {
  response.status(currentStatus).json({
    errorsMessages: [
      {
        message,
        field,
      },
    ],
  });
};
