import { NextFunction, Request, Response } from "express";

const blackListIp = [
  // "::1",
  "::2",
  "::3",
];

let counter = 0;

export const checkIpMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (blackListIp.includes(req.ip)) {
    counter++;
    return res.status(403).send("Forbidden");
  }
  next();
};
