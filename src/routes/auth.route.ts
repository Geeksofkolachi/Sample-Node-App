import express from "express";
import { config } from "dotenv";
import { userLogin, userSignup } from "../controllers";

config();

const router = express.Router();

router.post("/signup", userSignup).post("/login", userLogin);

export default router;
