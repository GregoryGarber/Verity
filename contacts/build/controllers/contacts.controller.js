"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __importDefault(require("../models"));
var dotenv_1 = __importDefault(require("dotenv"));
var uuid_1 = require("uuid");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
dotenv_1.default.config();
var dbClient = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
var contactSchema = models_1.default.contactSchema;
function addContact(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var contactInfo, putItemParams, _a, error, value, putItemCommand;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contactInfo = req.body;
                    contactInfo.contactID = (0, uuid_1.v4)();
                    putItemParams = {
                        TableName: process.env.TABLE,
                        Item: (0, util_dynamodb_1.marshall)(contactInfo),
                    };
                    _a = contactSchema.validate(contactInfo), error = _a.error, value = _a.value;
                    if (error !== undefined) {
                        console.log(error);
                        return [2 /*return*/, res.status(500).send({ message: error, custom: "Schema Error" })];
                    }
                    putItemCommand = new client_dynamodb_1.PutItemCommand(putItemParams);
                    return [4 /*yield*/, dbClient.send(putItemCommand, function (err, data) {
                            if (err) {
                                console.log(err);
                                return res
                                    .status(500)
                                    .send({ message: err.message, custom: "Dynamo Error", data: data });
                            }
                            console.log("Success - item added", data);
                            return res.status(200).send({ message: "Contact Added", data: data });
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//make sure contactidf and userid cant be changed
function updateContact(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var contactInfo, _a, error, value, getItemParams, getItemCommand, putItemParams, putItemCommand;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contactInfo = req.body;
                    _a = contactSchema.validate(contactInfo), error = _a.error, value = _a.value;
                    if (error !== undefined) {
                        console.log(error);
                        return [2 /*return*/, res.status(500).send({ message: error })];
                    }
                    getItemParams = {
                        TableName: process.env.TABLE,
                        Key: (0, util_dynamodb_1.marshall)({
                            contactID: contactInfo.contactID,
                        }),
                    };
                    getItemCommand = new client_dynamodb_1.GetItemCommand(getItemParams);
                    return [4 /*yield*/, dbClient.send(getItemCommand, function (err, data) {
                            if (err) {
                                if (err.name === "ItemNotFoundException") {
                                    console.log("Item not found");
                                }
                                else {
                                    console.error(err);
                                }
                                console.log(err);
                                return res.status(500).send({ message: err.message });
                            }
                        })];
                case 1:
                    _b.sent();
                    putItemParams = {
                        TableName: process.env.TABLE,
                        Item: (0, util_dynamodb_1.marshall)(contactInfo),
                    };
                    putItemCommand = new client_dynamodb_1.PutItemCommand(putItemParams);
                    return [4 /*yield*/, dbClient.send(putItemCommand, function (err, data) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send({ message: err.message });
                            }
                            console.log("Success - item updated", data);
                            return res.status(200).send({ message: "Contact Added", data: data });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var contactController = {
    addContact: addContact,
    updateContact: updateContact,
};
exports.default = contactController;
