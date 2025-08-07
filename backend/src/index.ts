import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute';
dotenv.config();

// app config
const app = express();
const port = process.env.port;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});