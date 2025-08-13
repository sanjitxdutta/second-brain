import { Request, Response } from "express";
import userModel from "../models/userModel";
import contentModel from "../models/contentModel";
import { nanoid } from "nanoid";

// share option toggle
const toggleSharing = async (req: Request, res: Response) => {

    // @ts-ignore
    const userId = req.userId;
    const { share } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (!user) return res.status(404).json({
            success: false,
            message: "User not found"
        });

        if (share) {
            if (!user.shareLink) user.shareLink = nanoid(10);
            user.shareEnabled = true;
        } else {
            user.shareEnabled = false;
        }

        await user.save();

        res.json({
            success: true,
            link: share ? `http://localhost:${process.env.port}/api/share/${user.shareLink}` : null
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// get content via shared link
const getSharedContent = async (req: Request, res: Response) => {

    const { shareLink } = req.params;

    try {
        const user = await userModel.findOne({ shareLink, shareEnabled: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid or disabled link"
            });
        }

        const content = await contentModel.find({ user: user._id }).select("-user -__v").sort({ createdAt: -1 });

        res.json({
            username: user.name,
            content
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export { toggleSharing, getSharedContent };
