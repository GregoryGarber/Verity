import controller from "../controllers/contacts.controller.js";
import authJwt from "../middlewares/index";
import { Express, NextFunction, Request, Response } from "express";

function contactsRoutes(app: Express) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/post", [authJwt.verifyToken], controller.addContact);

  app.delete("/api/post", [authJwt.verifyToken]);

  app.put("/api/post", [authJwt.verifyToken]);

  app.get("/api/post", [authJwt.verifyToken]);
}

export default contactsRoutes;
