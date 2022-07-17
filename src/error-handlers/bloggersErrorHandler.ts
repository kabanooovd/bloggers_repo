import { body } from "express-validator";

export const bloggerNameValidation = body("name")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Name is incorrect");

export const bloggerUrlValidation = body("youtubeUrl")
  .isURL()
  .isLength({ max: 100 });

// import { Response } from "express";

// export const checkDublicationErrorMessage = (
//   arr: any[],
//   fieldName: string,
//   messageValue: string
// ) => {
//   const dublicate = arr.find((el) => el.field === fieldName);
//   !dublicate && arr.push({ message: messageValue, field: fieldName });
// };

// export const errorHandler = (
//   response: Response,
//   currentStatus: number,
//   message: string,
//   field: string,
//   arr?: any[]
// ) => {
//   response.status(currentStatus).json({
//     errorsMessages: arr || [
//       {
//         message,
//         field,
//       },
//     ],
//   });
// };
