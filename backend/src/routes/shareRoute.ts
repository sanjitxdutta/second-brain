import express from "express";
import { getSharedContent, toggleSharing } from "../controllers/shareController";
import authMiddleware from "../middlewares/userAuth";

const shareRouter = express.Router();

shareRouter.post("/", authMiddleware, toggleSharing);

shareRouter.get("/:shareLink", getSharedContent);

export default shareRouter;