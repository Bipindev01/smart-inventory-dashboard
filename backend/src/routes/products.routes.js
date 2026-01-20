import express from 'express';
import { getAllProducts, updateStock } from '../controllers/products.controller.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/update-stock', updateStock);

export default router;