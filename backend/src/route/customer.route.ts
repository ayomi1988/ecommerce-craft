import express from 'express';

const router = express.Router();

import { createACustomer , deleteACustomer , getAllCustomer  , getcusById , updateCustomer } from '../controller/customer.controller';

router.post('/',createACustomer);
router.get('/',getAllCustomer);
router.get('/:empId',getcusById);
router.put('/:empId',updateCustomer);
router.delete('/:empId',deleteACustomer);

export default router;