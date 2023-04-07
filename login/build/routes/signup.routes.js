"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_controller_1 = __importDefault(require("../controllers/index.controller"));
function signUpRoutes(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/signUp", index_controller_1.default.signUpController.signUp);
    app.post("/api/confirmSignUp", index_controller_1.default.signUpController.confirmSignUp);
}
exports.default = signUpRoutes;
