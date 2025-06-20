import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import LoginSingnup from './routes/LoginSignup'

dotenv.config();
const app = express();
app.use(cookieParser())
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

const servers = ["http://localhost:5173","http://localhost:5174","http://localhost:5175"]

app.use(cors({
  origin: servers,
  credentials: true,
}));
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.use("/auth/users", LoginSingnup )




mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB Error:', err));

