"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
var contact_model_js_1 = __importDefault(require("./contact.model.js"));
var db = {
    mongoose: mongoose_1.default,
    contact: contact_model_js_1.default,
};
exports.default = db;
