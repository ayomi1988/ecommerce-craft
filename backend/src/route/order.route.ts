import express from 'express';

const router = express.Router();

import { createAOrder , deleteAOrder , getAllOrder  , getordById , updateOrder } from '../controller/order.controller';

router.post('/',createAOrder);
router.get('/',getAllOrder);
router.get('/:empId',getordById);
router.put('/:empId',updateOrder);
router.delete('/:empId',deleteAOrder);

export default router;