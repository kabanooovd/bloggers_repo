import { NextFunction, Request, Response } from "express";
import { basicDecoder } from "../utils/basic-decoder";

const hardCodedCreds = ["admin", "qwerty"];

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send("Not authorized");
    return;
  }
  if (authorization.split(" ")[0] !== "Basic") {
    res.status(401).send("Incorrect authorization");
    return;
  }
  const incomedCreds = basicDecoder(authorization.split(" ")[1]);
  for (let i = 0; i <= hardCodedCreds.length - 1; i++) {
    if (hardCodedCreds[i] !== incomedCreds[i]) {
      res.status(401).send("Incorrect credential");
      return;
    }
  }
  next();
};
