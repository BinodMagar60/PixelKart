import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import LoginSingnup from './routes/LoginSignup'
import Account from './routes/Account'
import Product from './routes/Product'



dotenv.config();
const app = express();
app.use(cookieParser())
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

const servers = process.env.ORIGIN

app.use(cors({
  origin: servers,
  credentials: true,
}));
app.use(express.json());

app.use("/auth/users", LoginSingnup )
app.use("/account", Account)
app.use("/product", Product)


app.get('/', (_req, res) => {
  res.send('API is running...');
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB Error:', err));

