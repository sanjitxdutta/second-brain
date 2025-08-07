import express from "express";
import { addContent, deleteContent, getContent } from "../controllers/contentController";
import authMiddleware from "../middlewares/userAuth";


const contentRouter = express.Router();

contentRouter.get("/", authMiddleware, getContent);

contentRouter.post("/add", authMiddleware, addContent);

contentRouter.post("/delete", authMiddleware, deleteContent);

export default contentRouter;