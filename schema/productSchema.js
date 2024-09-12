import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('product', productSchema);

export default Product;