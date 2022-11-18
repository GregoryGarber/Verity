import verifySignUp from "../middlewares/verifySignUp.js";
import controller from "../controllers/auth.controller.js";

function authRoutes(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
}

export default authRoutes;
