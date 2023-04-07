import { Express, NextFunction, Request, Response } from "express";
import controller from "../controllers/index.controller";

function signInRoutes(app: Express) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/signIn", controller.signInController.signIn);
}

export default signInRoutes;
