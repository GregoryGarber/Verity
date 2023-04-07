import { Express, NextFunction, Request, Response } from "express";
import controller from "../controllers/index.controller";

function signUpRoutes(app: Express) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/signUp", controller.signUpController.signUp);
  app.post("/api/confirmSignUp", controller.signUpController.confirmSignUp);
}

export default signUpRoutes;
