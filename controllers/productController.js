import Product from '../Schema/productSchema.js';

// Create a new product
const createSingleProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send({message:"create product successfully",product});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Create new products (single or multiple)
const createMultipleProducts = async (req, res) => {
    try {
        const products = req.body;

        if (!Array.isArray(products)) {
            return res.status(400).send({ message: "Please send an array of products." });
        }

        const createdProducts = await Product.insertMany(products);
        res.status(201).send({ message: "Products created successfully", createdProducts });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
export { createSingleProduct, createMultipleProducts, getProducts, getProductById, updateProduct, deleteProduct };