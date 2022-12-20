"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
var user_model_js_1 = __importDefault(require("./user.model.js"));
var db = {
    mongoose: mongoose_1.default,
    user: user_model_js_1.default,
};
exports.default = db;
