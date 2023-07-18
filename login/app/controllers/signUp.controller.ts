// Import necessary modules
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { Request, Response } from "express";
import crypto from "crypto";

// Load environment variables from .env file
dotenv.config();

// Configure AWS SDK
AWS.config.update({
  region: process.env.REGION, // Set region from environment variable
});

// Create new instance of CognitoIdentityServiceProvider
const cognitoISP = new AWS.CognitoIdentityServiceProvider();

// Get client ID and secret key from environment variables
const clientId = process.env.CLIENTID as string;
const clientSecret = process.env.CLIENTSECRET as string;

// Function to sign up a new user
function signUp(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body; // Extract email, password, and username from request body

    // Create a secret hash using the client ID and secret key
    const hmac = crypto.createHmac("sha256", clientSecret);
    hmac.update(`${username}${clientId}`);
    const secretHash = hmac.digest("base64");

    const userAttributes = [{ Name: "email", Value: email }]; // Set user attributes for sign up

    // Use CognitoIdentityServiceProvider.signUp to create a new user
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
          // If there is an error, send an error response
          console.log(err);
          return res.status(500).send({ message: err.message });
        }

        // If sign up is successful, send a success response
        return res
          .status(200)
          .send({ message: "User account created successfully", data: data });
      }
    );
  } catch (err) {
    // If there is an error, send an error response
    res.status(500).send(err);
  }
}

// Function to confirm user sign up
function confirmSignUp(req: Request, res: Response) {
  const { username, confirmationCode } = req.body; // Extract username and confirmation code from request body

  // Create a secret hash using the client ID and secret key
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(`${username}${clientId}`);
  const secretHash = hmac.digest("base64");

  // Use CognitoIdentityServiceProvider.confirmSignUp to confirm user sign up
  cognitoISP.confirmSignUp(
    {
      ClientId: clientId,
      Username: username,
      ConfirmationCode: confirmationCode,
      SecretHash: secretHash,
    },
    function (err, data) {
      if (err) {
        // If there is an error, send an error response
        console.log(err);
        return res.status(500).send({ message: err.message });
      }

      // If confirmation is successful, send a success response
      return res
        .status(200)
        .send({ message: "User account created successfully", data: data });
    }
  );
}

// Export the signUp and confirmSignUp functions as properties of an object
const signUpController = {
  signUp,
  confirmSignUp,
};
export default signUpController;
