// import { JsonWebTokenError } from "jsonwebtoken";
// import mongoose from "mongoose";
// const { Schema, model } = mongoose;

// const mongooseString = {
//   type: String,
//   required: true,
// };

// const businessInfo = {
//   email: [String],
//   phoneNumber: [String],
//   company: [String],
//   position: [String],
//   previousConversation: [String],
//   additionalSection: [
//     {
//       title: String,
//       content: String,
//     },
//   ],
// };

// const personalInfo = {
//   family: [String],
//   hobbies: [String],
//   funFacts: [String],
//   additionalSection: [
//     {
//       title: String,
//       content: String,
//     },
//   ],
// };

// const contact = {
//   firstName: mongooseString,
//   lastName: mongooseString,
//   businessInfo: {
//     type: businessInfo,
//     required: [true, "Business info needed"],
//   },
//   personalInfo: {
//     type: personalInfo,
//     required: [true, "Personal info needed"],
//   },
// };

// const contactSchema = new Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: [true, "userID required"],
//   },
//   contactInfo: {
//     type: contact,
//     required: [true, "Contact info needed"],
//   },
// });

// const Contact = model("Contact", contactSchema);
// export default Contact;

// const fake = {
//   userId: "",
//   contactInfo: {
//     firstName: "Dave",
//     lastName: "Chapelle",
//     businessInfo: {
//       email: [],
//       phoneNumber: [],
//       company: [],
//       position: [],
//       previousConversation: [],
//       additionalSection: [],
//     },
//     personalInfo: {
//       family: [],
//       hobbies: [],
//       funFacts: [],
//       additionalSection: [],
//     },
//   },
// };

const Joi = require("joi");

const contactSchema = Joi.object({
  contactID: Joi.string().required(),

  userID: Joi.string(),

  name: Joi.string().required(),

  email: Joi.array().items(Joi.string()),

  // company: Joi.array().items(Joi.string()),

  // previousConversation: Joi.array().items(Joi.string()),

  // family: Joi.array().items(Joi.string()),

  // hobbies: Joi.array().items(Joi.string()),

  // funFacts: Joi.array().items(Joi.string()),

  // additionalInfo: Joi.object(),
});

export default contactSchema;
