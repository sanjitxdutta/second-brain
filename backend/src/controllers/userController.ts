import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt-ts";
import { userSignupSchema, UserSignupInput } from "../validations/userValidation";

const createToken = (id: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// signup
const registerUser = async (req: Request, res: Response) => {
    const { success, data, error } = userSignupSchema.safeParse(req.body);

    if (!success) {
        const formattedErrors = error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
        }));

        return res.status(400).json({
            success: false,
            errors: formattedErrors,
        });
    }

    const { name, email, password } = data;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(403).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        });
    }
};

// signin
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

export { registerUser, loginUser }