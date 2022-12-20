//TODO general explanation
import dotenv from "dotenv";
import db from "../models/index.js";
import { NextFunction, Request, Response } from "express";

const User = db.user;

dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//TODO comments
async function signup(req: Request, res: Response) {
  try {
    console.log("signing up");
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();
    console.log("user saved");
    console.log(user._id);
    console.log(process.env.SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET as string, {
      expiresIn: 86400, // 24 hours
    });

    console.log("token created");

    res.status(200).send({
      message: "Successfully created user",
      data: {
        id: user._id,
        email: user.email,
        accessToken: token,
      },
    });
  } catch (err) {
    console.log("ERROR");
    res.status(500).send({ message: err });
  }
}

//TODO comments
async function signIn(req: Request, res: Response) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user === null) {
      res.status(404).send({ message: "User Not found." });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.secret as string, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

const controller = {
  signIn,
  signup,
};

export default controller;
