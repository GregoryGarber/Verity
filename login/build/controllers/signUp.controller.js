"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var dotenv_1 = __importDefault(require("dotenv"));
var crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    region: process.env.REGION,
    // credentials: {
    //   accessKeyId: process.env.ACCESSKEYID as string,
    //   secretAccessKey: process.env.SECRETACCESSKEY as string,
    // },
});
var cognitoISP = new aws_sdk_1.default.CognitoIdentityServiceProvider();
var clientId = process.env.CLIENTID;
var clientSecret = process.env.CLIENTSECRET;
function signUp(req, res) {
    try {
        var _a = req.body, email = _a.email, password = _a.password, username = _a.username;
        var hmac = crypto_1.default.createHmac("sha256", clientSecret);
        hmac.update("".concat(username).concat(clientId));
        var secretHash = hmac.digest("base64");
        var userAttributes = [{ Name: "email", Value: email }];
        cognitoISP.signUp({
            Username: username,
            Password: password,
            UserAttributes: userAttributes,
            ClientId: clientId,
            SecretHash: secretHash,
        }, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: err.message });
            }
            return res
                .status(200)
                .send({ message: "User account created successfully", data: data });
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}
function confirmSignUp(req, res) {
    var _a = req.body, username = _a.username, confirmationCode = _a.confirmationCode;
    console.log(username, confirmationCode);
    var hmac = crypto_1.default.createHmac("sha256", clientSecret);
    hmac.update("".concat(username).concat(clientId));
    var secretHash = hmac.digest("base64");
    cognitoISP.confirmSignUp({
        ClientId: clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
        SecretHash: secretHash,
    }, function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err.message });
        }
        return res
            .status(200)
            .send({ message: "User account created successfully", data: data });
    });
}
var signUpController = {
    signUp: signUp,
    confirmSignUp: confirmSignUp,
};
exports.default = signUpController;
