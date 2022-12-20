"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_js_1 = __importDefault(require("../controllers/auth.controller.js"));
function signUpInRoutes(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/auth/signup", auth_controller_js_1.default.signup);
    app.post("/api/auth/signIn", auth_controller_js_1.default.signIn);
}
exports.default = signUpInRoutes;
