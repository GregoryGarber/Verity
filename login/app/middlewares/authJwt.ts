/*
  To authenticate the user, and allow them to use certain features
*/
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//TODO comments
async function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
    //redirect to sign up page
  }

  const check = jwt.verify(token, process.env.secret as string);
  if (!check) {
    return res.status(401).send({ message: "Unauthorized!" });
    //redirect to sign in page
  } else {
    //good to go pass on
    //@ts-ignore
    if (check.userId === undefined) {
      return res.status(401).send({ message: "UserId is needed" });
      //redirect to sign in page
    }
    //@ts-ignore
    req.body.userId = check.userId; //attach user id to the request body
    next();
  }
}

const authJwt = {
  verifyToken,
};

export default authJwt;
