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
function signIn(req, res) {
    var _a = req.body, password = _a.password, username = _a.username;
    var hmac = crypto_1.default.createHmac("sha256", clientSecret);
    hmac.update("".concat(username).concat(clientId));
    var secretHash = hmac.digest("base64");
    var param = {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: secretHash,
        },
        ClientId: clientId,
    };
    cognitoISP.initiateAuth(param, function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err.message });
        }
        return res
            .status(200)
            .send({ message: "User account created successfully", data: data });
    });
}
var signInController = {
    signIn: signIn,
};
exports.default = signInController;
