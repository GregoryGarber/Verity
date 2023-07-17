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
        var contactInfo, putItemParams, error, putItemCommand, putResult, putErr_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contactInfo = req.body;
                    contactInfo.contactID = (0, uuid_1.v4)();
                    putItemParams = {
                        TableName: process.env.TABLE,
                        Item: (0, util_dynamodb_1.marshall)(contactInfo),
                    };
                    error = contactSchema.validate(contactInfo).error;
                    if (error !== undefined) {
                        console.log(error);
                        return [2 /*return*/, res.status(500).send({ message: error, custom: "Schema Error" })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    putItemCommand = new client_dynamodb_1.PutItemCommand(putItemParams);
                    return [4 /*yield*/, dbClient.send(putItemCommand)];
                case 2:
                    putResult = _a.sent();
                    console.log("Success - item updated", putResult);
                    return [2 /*return*/, res.status(200).send({ message: "Contact Added", data: putResult })];
                case 3:
                    putErr_1 = _a.sent();
                    console.log(putErr_1);
                    return [2 /*return*/, res.status(500).send({ message: putErr_1.message })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateContact(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var contactInfo, error, getItemParams, getItemCommand, getErr_1, putItemParams, putItemCommand, putResult, putErr_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contactInfo = req.body;
                    error = contactSchema.validate(contactInfo).error;
                    if (error !== undefined) {
                        console.log(error);
                        return [2 /*return*/, res.status(500).send({ message: error })];
                    }
                    getItemParams = {
                        TableName: process.env.TABLE,
                        Key: (0, util_dynamodb_1.marshall)({
                            contactID: contactInfo.contactID,
                            userID: contactInfo.userID,
                        }),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    getItemCommand = new client_dynamodb_1.GetItemCommand(getItemParams);
                    return [4 /*yield*/, dbClient.send(getItemCommand)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    getErr_1 = _a.sent();
                    console.log(getErr_1);
                    return [2 /*return*/, res.status(500).send({ message: getErr_1.message })];
                case 4:
                    putItemParams = {
                        TableName: process.env.TABLE,
                        Item: (0, util_dynamodb_1.marshall)(contactInfo),
                    };
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    putItemCommand = new client_dynamodb_1.PutItemCommand(putItemParams);
                    return [4 /*yield*/, dbClient.send(putItemCommand)];
                case 6:
                    putResult = _a.sent();
                    console.log("Success - item updated", putResult);
                    return [2 /*return*/, res
                            .status(200)
                            .send({ message: "Contact Updated", data: putResult })];
                case 7:
                    putErr_2 = _a.sent();
                    console.log(putErr_2);
                    return [2 /*return*/, res.status(500).send({ message: putErr_2.message })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function deleteContact(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, contactID, userID, deleteItemParams, deleteItemCommand, deleteErr_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body.data, contactID = _a.contactID, userID = _a.userID;
                    if (contactID === undefined) {
                        return [2 /*return*/, res.status(500).send({ message: "contactID is missing" })];
                    }
                    deleteItemParams = {
                        TableName: process.env.TABLE,
                        Key: (0, util_dynamodb_1.marshall)({
                            contactID: contactID,
                            userID: userID,
                        }),
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    deleteItemCommand = new client_dynamodb_1.DeleteItemCommand(deleteItemParams);
                    return [4 /*yield*/, dbClient.send(deleteItemCommand)];
                case 2:
                    _b.sent();
                    console.log("Item deleted successfully");
                    return [2 /*return*/, res.status(200).send({ message: "Item deleted successfully" })];
                case 3:
                    deleteErr_1 = _b.sent();
                    console.error(deleteErr_1);
                    return [2 /*return*/, res.status(500).send({ message: deleteErr_1.message })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getAllContacts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, queryParams, queryCommand, queryResult, queryErr_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = req.query.userId;
                    if (userID === undefined)
                        return [2 /*return*/, res.status(500).send({ message: "userID missing" })];
                    queryParams = {
                        TableName: process.env.TABLE,
                        KeyConditionExpression: "#uid = :id",
                        ExpressionAttributeNames: {
                            "#uid": "userID",
                        },
                        ExpressionAttributeValues: (0, util_dynamodb_1.marshall)({
                            ":id": userID,
                        }),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    queryCommand = new client_dynamodb_1.QueryCommand(queryParams);
                    return [4 /*yield*/, dbClient.send(queryCommand)];
                case 2:
                    queryResult = _a.sent();
                    if (queryResult.Items === undefined) {
                        throw { message: "Error in queryResult: .Items undefined" };
                    }
                    if (queryResult.Items.length === 0) {
                        console.log("No items found for the specified user ID");
                        return [2 /*return*/, res
                                .status(404)
                                .send({ message: "No items found for the specified user ID" })];
                    }
                    // queryResult.Items will contain an array of items that match the specified userID
                    console.log("Items found:", queryResult.Items);
                    return [2 /*return*/, res.status(200).send({ items: queryResult.Items })];
                case 3:
                    queryErr_1 = _a.sent();
                    console.error("Error querying items:", queryErr_1);
                    return [2 /*return*/, res.status(500).send({ message: queryErr_1.message })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var contactController = {
    addContact: addContact,
    updateContact: updateContact,
    deleteContact: deleteContact,
    getAllContacts: getAllContacts,
};
exports.default = contactController;
