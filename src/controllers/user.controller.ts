import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageSize = Number(req.query?.pageSize) || 20;
    let page = Number(req.query?.page) || 0;
    page = page - 1;
    const users = User.find().skip(Number(page)).limit(Number(pageSize));
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400).send("User id is required");
    }
    const user = await User.findById(userId);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const updatedUser = await User.updateOne({ _id: user._id }, user);
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await User.deleteOne({ _id: userId });
    res.status(200).send("user deleted successfully");
  } catch (error) {
    next(error);
  }
};
