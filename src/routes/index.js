import express from 'express';
const router = express.Router();

import productController from '../controllers/productController.js';
import categoryController from '../controllers/categoryController.js';

router.get('/products', productController.index);
router.get('/categories', categoryController.index);
router.get('/categories/:category/attributes', categoryController.getAttributes);

export default router;