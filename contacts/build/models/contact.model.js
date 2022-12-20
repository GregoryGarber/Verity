"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, model = mongoose_1.default.model;
var mongooseString = {
    type: String,
    required: true,
};
var businessInfo = {
    email: [String],
    phoneNumber: [String],
    company: [String],
    position: [String],
    previousConversation: [String],
    additionalSection: [
        {
            title: String,
            content: String,
        },
    ],
};
var personalInfo = {
    family: [String],
    hobbies: [String],
    funFacts: [String],
    additionalSection: [
        {
            title: String,
            content: String,
        },
    ],
};
var contact = {
    firstName: mongooseString,
    lastName: mongooseString,
    businessInfo: {
        type: businessInfo,
        required: [true, "Business info needed"],
    },
    personalInfo: {
        type: personalInfo,
        required: [true, "Personal info needed"],
    },
};
var contactSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userID required"],
    },
    contactInfo: {
        type: contact,
        required: [true, "Contact info needed"],
    },
});
var Contact = model("Contact", contactSchema);
exports.default = Contact;
