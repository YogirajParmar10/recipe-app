import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import User from "../models/user";
import { validationResult, ValidationError } from "express-validator";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: any = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage: string = errors.array()[0].msg;
    return res.status(422).json({ message: errorMessage });
  }

  const email: string = req.body.email;
  const existingUser = await User.findOne({ where: { email: req.body.email } });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const name: string = req.body.name;
  const password: string = req.body.password;
  try {
    const hashedPass: string = await bcrypt.hash(password, 12);
    const user = User.create({
      email: email,
      name: name,
      password: hashedPass,
    });
    res.status(201).json({
      message: "Sign-up Successful",
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: any = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage: string = errors.array()[0].msg;
    return res.status(422).json({ message: errorMessage });
  }
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isEqual: boolean = await bcrypt.compare(
      password,
      user.getDataValue("password") // sequelize instance method
    );
    if (!isEqual) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Sign-in successful", user: user });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
