import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute';
import contentRouter from './routes/contentRoute';
import shareRouter from './routes/shareRoute';
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
app.use("/api/content", contentRouter);
app.use("/api/share", shareRouter);

app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});