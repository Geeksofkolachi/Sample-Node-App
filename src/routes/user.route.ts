import { config } from "dotenv";
import express from "express";
import { deleteUser, getUsers, getUser, updateUser } from "../controllers";

config();

const router = express.Router();

router
  .put("/", updateUser)
  .get("/", getUsers)
  .get("/:userId", getUser)
  .delete("/:userId", deleteUser);

export default router;
