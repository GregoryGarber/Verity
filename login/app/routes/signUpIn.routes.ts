import controller from "../controllers/auth.controller.js";
import { Express, NextFunction, Request, Response } from "express";

function signUpInRoutes(app: Express) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", controller.signup);

  app.post("/api/auth/signIn", controller.signIn);
}

export default signUpInRoutes;
