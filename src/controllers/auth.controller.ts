import { config } from "dotenv";
import { Request, Response } from "express";
import { verifyGoogleToken } from "../services";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

config();

const { JWT_SECRET } = process.env;

const userSignup = async (req: Request, res: Response) => {
  try {
    if (req?.body?.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const user = await User.create({
        email: profile?.email,
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
      });

      res.status(201).json({
        message: "Signup was successful",
        user: {
          ...user,
          token: jwt.sign({ email: profile?.email }, JWT_SECRET as string, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured. Registration failed.",
    });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const user = await User.findOne({ email: profile?.email });

      if (!user) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          ...user,
          token: jwt.sign({ email: profile?.email }, JWT_SECRET as string, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    let message = error instanceof Error ? error.message : error;
    res.status(500).json({
      message,
    });
  }
};

export { userSignup, userLogin };
