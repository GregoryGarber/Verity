//TODO general explanation
import db from "../models/index.js";
import { Request, Response } from "express";

const Contact = db.contact;

async function addContact(req: Request, res: Response) {
  try {
    const contact = new Contact({
      userId: req.body.userId,
      contactInfo: req.body.contactInfo,
    });
    await contact.save();
    console.log("Successfully created new contact");
    res.status(200).send({
      message: "Successfully created new contact",
      data: contact,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getContacts(req: Request, res: Response) {
  try {
    const contacts = await Contact.find({
      userId: req.body.userId,
    });

    if (!contacts) {
      console.log("Failed to fetch contacts");
      res.status(404).send("Failed to fetch contacts");
    }

    console.log("Successfully fetched contacts");
    res.status(200).send({
      message: "Successfully fetched contacts",
      data: contacts,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateContact(req: Request, res: Response) {
  try {
    const id = req.body._id;

    if (!id) {
      console.log("Failed to fetch contacts, ID DNE");
      res.status(400).send("Failed to fetch contacts, ID DNE");
      return;
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      console.log("Failed to fetch contacts");
      res.status(404).send("Failed to fetch contacts");
      return;
    }

    contact.contactInfo = req.body.contactInfo;
    await contact.save();

    console.log("Successfully updated contact", contact);
    res.status(200).send({
      message: "Successfully updated contact",
      data: contact,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteContact(req: Request, res: Response) {
  try {
    const id = req.body._id;

    if (!id) {
      console.log("Failed to fetch contacts, ID DNE");
      res.status(400).send("Failed to fetch contacts, ID DNE");
      return;
    }

    const contact = await Contact.findByIdAndDelete(id);
    console.log("Successfully deleted contact", contact);
    res.status(200).send({
      message: "Successfully deleted contact",
      data: contact,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

const controller = {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
};

export default controller;
