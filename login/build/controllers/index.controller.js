"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var signUp_controller_1 = __importDefault(require("./signUp.controller"));
var signIn_controllers_1 = __importDefault(require("./signIn.controllers"));
var controller = {
    signInController: signIn_controllers_1.default,
    signUpController: signUp_controller_1.default,
};
exports.default = controller;
