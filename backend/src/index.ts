import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
dotenv.config();

// db connection
connectDB();

const app = express();

app.listen(3000);