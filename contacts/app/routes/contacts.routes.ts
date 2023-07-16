import contactController from "../controllers/contacts.controller";
import { Express, NextFunction, Request, Response } from "express";

function contactsRoutes(app: Express) {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/addContact", contactController.addContact);

  app.put("/api/updateContact", contactController.updateContact);
}

export default contactsRoutes;
