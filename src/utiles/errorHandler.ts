import { Response } from "express";

export const errorHandler = (
  response: Response,
  currentStatus: number,
  message: string,
  field: string,
  arr?: any[]
) => {
  response.status(currentStatus).json({
    errorsMessages: arr || [
      {
        message,
        field,
      },
    ],
  });
};
