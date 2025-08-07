import { Request, Response } from "express";
import contentModel from "../models/contentModel";

// add content
const addContent = async (req: Request, res: Response) => {

    const { type, title, link, tags } = req.body;

    // @ts-ignore
    const userId = req.userId;

    try {
        const newContent = new contentModel({
            type,
            title,
            link,
            tags,
            user: userId
        });

        const saved = await newContent.save();

        res.status(201).json({
            success: true,
            data: saved
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add content"
        });
    }
}

// get content
const getContent = async (req: Request, res: Response) => {

    // @ts-ignore
    const userId = req.userId;

    try {
        const content = await contentModel.find({ user: userId }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch content"
        });
    }
}

// delete content
const deleteContent = async (req: Request, res: Response) => {

    const { id } = req.body;

    // @ts-ignore
    const userId = req.userId;

    try {
        const content = await contentModel.findOneAndDelete({ _id: id, user: userId });

        if (!content) {
            return res.status(404).json({
                success: false,
                message: "Content not found or not authorized"
            });
        }

        res.json({
            success: true,
            message: "Content deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete content"
        });
    }
}

export { addContent, getContent, deleteContent }