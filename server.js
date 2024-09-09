import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://tausif:tausif@cluster0.u1q9igy.mongodb.net/E-Commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
app.use('/', userRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});