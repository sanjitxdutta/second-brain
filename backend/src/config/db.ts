import mongoose from "mongoose";

export const connectDB = async () => {
    //@ts-ignore
    await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB Connected"));
}