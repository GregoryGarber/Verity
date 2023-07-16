"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contacts_controller_1 = __importDefault(require("../controllers/contacts.controller"));
function contactsRoutes(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/addContact", contacts_controller_1.default.addContact);
    app.put("/api/updateContact", contacts_controller_1.default.updateContact);
}
exports.default = contactsRoutes;
