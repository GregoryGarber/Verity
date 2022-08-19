const mongoose = require('mongoose');
// TODO:
// - create a custum field for both personal and business
const contactInfoSchema = mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    }
})

const socialSchema = mongoose.Schema({
    LinkedIn: {
        String,
        required: true
    },
    Facebook: {
        String,
        required: true
    },
    Instagram: {
        String,
        required: true
    },
})

const geographySchema = mongoose.Schema({
    Location: {
        type: String,
        required: true
    },
    "Time Zone": {
        type: String,
        required: true
    },
})

const jobSchema = mongoose.Schema({
    Company: {
        type: String,
        required: true
    },
    Position: {
        type: String,
        required: true
    },
})

const businessInfoSchema = mongoose.Schema({
    contactInfo: {
        type: contactInfoSchema,
        required: true
    },
    social: {
        type: socialSchema,
        required: true
    },
    geography: {
        type: geographySchema,
        required: true
    },
    job: {
        type: jobSchema,
        required: true
    },
    "Previous Conversation Topics": {
        type: [String]
    }
})

const home = mongoose.Schema({
    Birthday: {
        type: Date,
        required: true
    },
    Hometown: {
        type: String,
        required: true
    },
})

const personalInfoSchema = mongoose.Schema({
    "contactInfo": {
        type: home,
        required: true
    },
    "Family": {
        type: [String],
        required: true
    },
    "Hobbies": {
        type: [String],
        required: true
    },
    "Fun Facts": {
        type: [String],
        required: true
    },
})

const userContactInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    "Business Information": {
        type: businessInfoSchema,
        required: true
    },
    "Personal Information": {
        type: personalInfoSchema,
        required: true
    },
    lastViewed: {
        type: Date,
        required: true
    },
    meetingToday: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }//get an id here
})

const Contact = mongoose.model("Contact", userContactInfoSchema);
module.exports = Contact;