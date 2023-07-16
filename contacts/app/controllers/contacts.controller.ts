import db from "../models";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

dotenv.config();

const dbClient = new DynamoDBClient({ region: process.env.REGION });

const contactSchema = db.contactSchema;

async function addContact(req: Request, res: Response) {
  const contactInfo = req.body;
  contactInfo.contactID = uuidv4();

  const putItemParams = {
    TableName: process.env.TABLE,
    Item: marshall(contactInfo),
  };

  const { error, value } = contactSchema.validate(contactInfo);

  if (error !== undefined) {
    console.log(error);
    return res.status(500).send({ message: error, custom: "Schema Error" });
  }

  const putItemCommand = new PutItemCommand(putItemParams);

  await dbClient.send(putItemCommand, (err: { message: any }, data: any) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: err.message, custom: "Dynamo Error", data: data });
    }
    console.log("Success - item added", data);
    return res.status(200).send({ message: "Contact Added", data: data });
  });
}

//make sure contactidf and userid cant be changed
async function updateContact(req: Request, res: Response) {
  const contactInfo = req.body;
  const { error, value } = contactSchema.validate(contactInfo);

  if (error !== undefined) {
    console.log(error);
    return res.status(500).send({ message: error });
  }

  let getItemParams = {
    TableName: process.env.TABLE,
    Key: marshall({
      contactID: contactInfo.contactID,
    }),
  };

  const getItemCommand = new GetItemCommand(getItemParams);

  await dbClient.send(getItemCommand, (err: any, data: any) => {
    if (err) {
      if (err.name === "ItemNotFoundException") {
        console.log("Item not found");
      } else {
        console.error(err);
      }
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  });

  const putItemParams = {
    TableName: process.env.TABLE,
    Item: marshall(contactInfo),
  };

  const putItemCommand = new PutItemCommand(putItemParams);

  await dbClient.send(putItemCommand, (err: { message: any }, data: any) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
    console.log("Success - item updated", data);
    return res.status(200).send({ message: "Contact Added", data: data });
  });
}

const contactController = {
  addContact,
  updateContact,
};

export default contactController;
