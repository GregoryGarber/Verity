"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contact_model_1 = __importDefault(require("./contact.model"));
var db = {
    contactSchema: contact_model_1.default,
};
exports.default = db;
