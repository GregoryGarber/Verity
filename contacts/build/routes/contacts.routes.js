"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contacts_controller_js_1 = __importDefault(require("../controllers/contacts.controller.js"));
var index_1 = __importDefault(require("../middlewares/index"));
function contactsRoutes(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/post", [index_1.default.verifyToken], contacts_controller_js_1.default.addContact);
    app.delete("/api/post", [index_1.default.verifyToken]);
    app.put("/api/post", [index_1.default.verifyToken]);
    app.get("/api/post", [index_1.default.verifyToken]);
}
exports.default = contactsRoutes;
