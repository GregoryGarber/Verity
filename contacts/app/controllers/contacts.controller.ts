import db from "../models";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

dotenv.config();

const dbClient = new DynamoDBClient({ region: process.env.REGION });

const contactSchema = db.contactSchema;

async function addContact(req: Request, res: Response) {
  // MAKE SURE USERID EXISTS
  // VERIFYING WITH TOKEN??
  const contactInfo = req.body;
  contactInfo.contactID = uuidv4();

  const putItemParams = {
    TableName: process.env.TABLE,
    Item: marshall(contactInfo),
  };

  const { error } = contactSchema.validate(contactInfo);

  if (error !== undefined) {
    console.log(error);
    return res.status(500).send({ message: error, custom: "Schema Error" });
  }

  try {
    const putItemCommand = new PutItemCommand(putItemParams);
    const putResult = await dbClient.send(putItemCommand);
    console.log("Success - item updated", putResult);
    return res.status(200).send({ message: "Contact Added", data: putResult });
  } catch (putErr: any) {
    console.log(putErr);
    return res.status(500).send({ message: putErr.message });
  }
}

async function updateContact(req: Request, res: Response) {
  // MAKE SURE USERID EXISTS
  // VERIFYING WITH TOKEN??

  const contactInfo = req.body;
  const { error } = contactSchema.validate(contactInfo);

  if (error !== undefined) {
    console.log(error);
    return res.status(500).send({ message: error });
  }

  const getItemParams = {
    TableName: process.env.TABLE,
    Key: marshall({
      contactID: contactInfo.contactID,
      userID: contactInfo.userID,
    }),
  };

  try {
    const getItemCommand = new GetItemCommand(getItemParams);
    await dbClient.send(getItemCommand);
  } catch (getErr: any) {
    console.log(getErr);
    return res.status(500).send({ message: getErr.message });
  }

  const putItemParams = {
    TableName: process.env.TABLE,
    Item: marshall(contactInfo),
  };

  try {
    const putItemCommand = new PutItemCommand(putItemParams);
    const putResult = await dbClient.send(putItemCommand);
    console.log("Success - item updated", putResult);
    return res
      .status(200)
      .send({ message: "Contact Updated", data: putResult });
  } catch (putErr: any) {
    console.log(putErr);
    return res.status(500).send({ message: putErr.message });
  }
}

async function deleteContact(req: Request, res: Response) {
  // MAKE SURE USERID EXISTS
  // VERIFYING WITH TOKEN??

  const { contactID, userID } = req.body.data;

  if (contactID === undefined) {
    return res.status(500).send({ message: "contactID is missing" });
  }

  const deleteItemParams = {
    TableName: process.env.TABLE,
    Key: marshall({
      contactID: contactID,
      userID: userID,
    }),
  };

  try {
    const deleteItemCommand = new DeleteItemCommand(deleteItemParams);
    await dbClient.send(deleteItemCommand);
    console.log("Item deleted successfully");
    return res.status(200).send({ message: "Item deleted successfully" });
  } catch (deleteErr: any) {
    console.error(deleteErr);
    return res.status(500).send({ message: deleteErr.message });
  }
}

async function getAllContacts(req: Request, res: Response) {
  // MAKE SURE USERID EXISTS
  // VERIFYING WITH TOKEN??

  const userID = req.query.userId;
  if (userID === undefined)
    return res.status(500).send({ message: "userID missing" });

  const queryParams = {
    TableName: process.env.TABLE,
    KeyConditionExpression: "#uid = :id",
    ExpressionAttributeNames: {
      "#uid": "userID",
    },
    ExpressionAttributeValues: marshall({
      ":id": userID,
    }),
  };

  try {
    const queryCommand = new QueryCommand(queryParams);
    const queryResult = await dbClient.send(queryCommand);

    if (queryResult.Items === undefined) {
      throw { message: "Error in queryResult: .Items undefined" };
    }

    if (queryResult.Items.length === 0) {
      console.log("No items found for the specified user ID");
      return res
        .status(404)
        .send({ message: "No items found for the specified user ID" });
    }

    // queryResult.Items will contain an array of items that match the specified userID
    console.log("Items found:", queryResult.Items);
    return res.status(200).send({ items: queryResult.Items });
  } catch (queryErr: any) {
    console.error("Error querying items:", queryErr);
    return res.status(500).send({ message: queryErr.message });
  }
}

const contactController = {
  addContact,
  updateContact,
  deleteContact,
  getAllContacts,
};

export default contactController;
