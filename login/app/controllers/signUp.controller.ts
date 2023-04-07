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

function signUp(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;

    const hmac = crypto.createHmac("sha256", clientSecret);
    hmac.update(`${username}${clientId}`);
    const secretHash = hmac.digest("base64");
    const userAttributes = [{ Name: "email", Value: email }];

    cognitoISP.signUp(
      {
        Username: username,
        Password: password,
        UserAttributes: userAttributes,
        ClientId: clientId,
        SecretHash: secretHash,
      },
      function (err, data) {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: err.message });
        }

        return res
          .status(200)
          .send({ message: "User account created successfully", data: data });
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
}

function confirmSignUp(req: Request, res: Response) {
  const { username, confirmationCode } = req.body;
  console.log(username, confirmationCode);
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(`${username}${clientId}`);
  const secretHash = hmac.digest("base64");
  cognitoISP.confirmSignUp(
    {
      ClientId: clientId,
      Username: username,
      ConfirmationCode: confirmationCode,
      SecretHash: secretHash,
    },
    function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
      }

      return res
        .status(200)
        .send({ message: "User account created successfully", data: data });
    }
  );
}
const signUpController = {
  signUp,
  confirmSignUp,
};
export default signUpController;
