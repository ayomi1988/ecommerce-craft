import express from 'express';
const router = express.Router();
import { createAProduct, deleteAProduct, getAllProduct, getprodById, updateProduct } from '../controller/product.controller';
router.post('/', createAProduct);
router.get('/', getAllProduct);
router.get('/:empId', getprodById);
router.put('/:empId', updateProduct);
router.delete('/:empId', deleteAProduct);
export default router;
