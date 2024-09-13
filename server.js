import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'; 
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect("mongodb+srv://tausif:tausif@cluster0.u1q9igy.mongodb.net/E-Commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const corsOptions = {
    origin :'http://localhost:5173',
    optionSuccessStatus: 200,
    Credentials: true
}

app.use(cors(corsOptions()));

// Routes
app.use('/', userRoutes);
app.use('/', productRoutes);


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});