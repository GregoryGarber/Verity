import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Request, Response } from "express";
import crypto from "crypto";
dotenv.config();

AWS.config.update({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESSKEYID as string,
    secretAccessKey: process.env.SECRETACCESSKEY as string,
  },
});

const cognitoISP = new AWS.CognitoIdentityServiceProvider();
const clientId = process.env.CLIENTID as string;
const clientSecret = process.env.CLIENTSECRET as string;

function signIn(req: Request, res: Response) {
  const { password, username } = req.body;

  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(`${username}${clientId}`);
  const secretHash = hmac.digest("base64");

  const param = {
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

const signInController = {
  signIn,
};
export default signInController;
