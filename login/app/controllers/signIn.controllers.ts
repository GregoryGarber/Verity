// import necessary packages
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Request, Response } from "express";
import crypto from "crypto";

// load environment variables from .env file
dotenv.config();

// configure AWS SDK with the desired region
AWS.config.update({
  region: process.env.REGION,
});

// create a new instance of the CognitoIdentityServiceProvider
const cognitoISP = new AWS.CognitoIdentityServiceProvider();

// retrieve the client ID and client secret from environment variables
const clientId = process.env.CLIENTID as string;
const clientSecret = process.env.CLIENTSECRET as string;

// define a function for user sign-in
function signIn(req: Request, res: Response) {
  // retrieve the username and password from the request body
  const { password, username } = req.body;

  // create a new HMAC object using the client secret
  const hmac = crypto.createHmac("sha256", clientSecret);

  // compute the secret hash using the username and client ID
  hmac.update(`${username}${clientId}`);
  const secretHash = hmac.digest("base64");

  // create a parameter object for the initiateAuth function
  const param = {
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
    ClientId: clientId,
  };

  // call the initiateAuth function with the parameter object
  cognitoISP.initiateAuth(param, function (err, data) {
    if (err) {
      // handle errors by logging them and sending an error response
      console.log(err);
      return res.status(500).send({ message: err.message });
    }

    // send a success response with the user data
    return res
      .status(200)
      .send({ message: "User account created successfully", data: data });
  });
}

// export the signIn function as a controller object
const signInController = {
  signIn,
};
export default signInController;
