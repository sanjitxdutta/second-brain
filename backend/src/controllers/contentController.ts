import { Request, Response } from "express";
import contentModel from "../models/contentModel";

// add content
const addContent = async (req: Request, res: Response) => {

}

// get content
const getContent = async (req: Request, res: Response) => {
    console.log("Content route is working")
}

// delete content
const deleteContent = async (req: Request, res: Response) => {

}

export { addContent, getContent, deleteContent }