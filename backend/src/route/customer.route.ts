import express from 'express';

const router = express.Router();

import { createACustomer , deleteACustomer , getAllCustomer  , getcusById , updateCustomer, loginCustomer } from '../controller/customer.controller';

router.post('/',createACustomer);
router.get('/',getAllCustomer);
router.get('/:empId',getcusById);
router.put('/:empId',updateCustomer);
router.delete('/:empId',deleteACustomer);
router.post('/signing',loginCustomer);

export default router;