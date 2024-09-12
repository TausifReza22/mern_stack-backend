import express from 'express';
import { createSingleProduct,createMultipleProducts,getProducts,getProductById,updateProduct,deleteProduct } from '../controllers/productController.js';
import { authMiddleware, isAdmin } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/createSingleProduct', authMiddleware, isAdmin, createSingleProduct);
router.post('/multipleproducts',authMiddleware, isAdmin, createMultipleProducts);
router.get('/getProducts', getProducts);
router.get('/getProduct/:id', getProductById);
router.put('/getProduct/:id',authMiddleware, isAdmin, updateProduct);
router.delete('/getProduct/:id',authMiddleware, isAdmin, deleteProduct);

export default router;